const User = require("../models/User");
const Token = require("../models/Token");

const sendVerifyEmail = require("../services/sendVerifyEmail");



const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Creates jwt token for verifying the email; expiration date should match the expiration
// in the database
const generateEmailToken = () => {
	return crypto.randomBytes(32).toString("hex");
};

/**
 * Create a 'verification link'. This link should route the user to the front end route 'VerifyEmail' page
 * where token is the string
 */
const generateVerificationURL = (token) => {
	return `${process.env.BASE_URL}/verify-email/${token}`;
};

const signup = async (req, res) => {
	const { name, email, password } = req.body;

	// Check if email is already in use
	const existingUser = await User.findOne({ email: email });

	if (existingUser) {
		res.status(400).json({
			message: "An account with this email already exists! Please use a different email!",
		});
		return;
	}

	// Email is unique, so hash the password and create the user
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({
		name,
		email,
		password: passwordHash,
	});

	/*
	- Create an email verification token in the database. We'll use a JsonWebToken to 
	act as the token or string, and I'll explain this in the verifyEmail function.
	*/
	const token = await Token.create({
		userId: user._id,
		token: generateEmailToken(),
	});

	// Create a URL that the client will make a request to, in order to verify their account
	const verificationURL = generateVerificationURL(token.token);

	// Send the user an email with the link to verify the email to their account
	await sendVerifyEmail(user.email, user.name, verificationURL);

	res.status(201).json({
		message: `An email was sent to '${user.email}'. Check your email to verify your account!`,
	});
};







const signin = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Check if the email correlates to any user; if not, return the error message
	if (!user) {
		console.log("Email is bad!");
		res.status(400).json({ message: "Email or password is incorrect!" });
		return;
	}

	// Verify the password; If the password entered is incorrect, then return an error message
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		console.log("Password is bad!");
		res.status(400).json({ message: "Email or password is incorrect!" });
		return;
	}

	/*
  - At this point username and password is correct, the last thing we need to check is whether or not 
    the user verified their email. If they haven't verified their email yet, then we will stop them 
    here and resend them a verification link.

  1. We'll find whether or not there's an existing token that they can useto verify 
    their account. If there's no existing token, then we'll recreate a new email verification
    token for them to use. Then finally we'll send back our response.
  
  - NOTE: Resending the verification link is an important part of the process. There's always the chance 
  that the user never got around to verifying their email when they first created their account and got sent 
  the verification link. So we give them another chance by resending it here.
  
  Notice that in the case there their token didn't exist, that means they created their account 
  and waited too long, so their verification link expired!
  */
	if (!user.isVerified) {
		console.log("User wasn't verified, sending an email!")

		let token = await Token.findOne({ userId: user._id });
		// If token doesn't exist, create a new one
		if (!token) {
			token = await Token.create({
				userId: user._id,
				token: generateEmailToken(),
			});
		}

		// Create a URL that the client will make a request to, in order to verify their account
		const verificationURL = generateVerificationURL(token.token);

		

		// Send the user an email with the link to verify the email to their account
		await sendVerifyEmail(user.email, user.name, verificationURL);

		// Stop function execution early
		res.status(400).json({
			message: "Account email hasn't been verified yet. Check your inbox!"
		})
		return ;
	}

	// At this point the login is successful
	res.status(200).json({
		message: "Login successful",
		user: user,
	});
};

/**
 * Client will make a request to this route. Essentially the user would click on the link
 * and it'll make a request to this route
 *
 * ROUTE: /auth/verify-email/:token
 * NOTE: To protect this route from abuse, use express-rate-limiting. Also another suggestion is to leverage jwt tokens
 * so you'd verify the JWT token and makr user in the database (no token schema). Or use both and
 * so you'd verify the jwt token first (ensures no abuse), and then see if the token is in the database.
 */
const verifyEmail = async (req, res) => {
	try {
		// Find token in the database associated with the token string
		const token = await Token.findOne({
			token: req.params.token,
		});

		// If no token, stop execution early
		if (!token) {
			res.status(400).json({
				message:
					"Account doesn't exist, or has been verified already! Please signup or log in!",
			});
			return;
		}

		// Attempt to find user associated with the token; realistically you should be able to find the user
		const user = await User.findOne({
			_id: token.userId,
		});
		if (!user) {
			res.status(400).json({
				message:
					"Account doesn't exist, or has been verified already! Please signup or log in!",
			});
			return;
		}

		// At this point, the user's account exists, and the token exists as well.
		// So the verification was successful. Now we do two things:
		// 1. Update user.isVerified = true, to indicate the user's email is now verified
		// 2. Delete the token from the tokens table as it's no longer needed. As a result
		//    we free up space and don't slow down our token queries.

		user.isVerified = true;
		await user.save();
		await Token.deleteOne({ _id: token._id });

		res.status(200).json({
			message: `Account with email ${user.email} is now verified. You can now login!`,
		});
	} catch (err) {
		console.log("Error verifying email: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	signup,
	signin,
	verifyEmail,
};
