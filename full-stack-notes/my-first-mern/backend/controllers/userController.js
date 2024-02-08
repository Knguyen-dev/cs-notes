const User = require("../models/user");
const jwt = require("jsonwebtoken");

/*
+ Our function for creating JWT tokens:
1. We plan to pass in '_id' which is to make it easier to tell
  that we're sending in the ID of our user documents. This first 
  argument is just the payload.
2. Pass in the secret as the second argument
3. Pass in some extra optiosn for the third argument. 
  Here we're saying the token expires in three days

*/
const createToken = (_id) => {
	return jwt.sign(
		{
			_id,
		},
		process.env.SECRET,
		{ expiresIn: "3d" }
	);
};

/*
+ Login logic


- NOTE: loginUser and signupUser are just our route handlers that get the data
  and pass it to the static methods. The static methods will then see if a user 
  was found or not, and if so, our methods can send back the email and a jwt token.
*/
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Try to login, if successful we're returned the user
		const user = await User.login(email, password);

		// Create token for that user, and then return the email and the json token
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

/*
+ Handles process for signing up a user.
1. Gets the email and password.
2. Then we call the signup function which not only checks if the email
  is already in use, but also encrypts the password. As a result the user
  is saved in the database.
3. On success we should be returned a user, so we'll just 
  send back the email and user in json format.
4. If an error happens though, it would be the 'email already in use' error we
  created, or probably an error from Mongoose.

*/
const signupUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.signup(email, password);

		// At this point user successfully signed up so create a jwt token for them.
		const token = createToken(user._id);

		// So when users sign up, we send back the email and JWT as a response.
		res.status(200).json({
			email,
			token,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	loginUser,
	signupUser,
};
