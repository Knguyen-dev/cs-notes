const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { connection, User } = require("./database");
const { validatePassword } = require("../lib/passwordUtils");

/*
+ Customfields: Here you use 'usernameField' and 'passwordField'
  to indicate 'name' attributes of those form controls, and ultimately
  the keys in the req.body, so now passport looks for the username 
  in req.body.uname, and passowrd in req.body.pw! This gives us better
  control over passport basically.
*/
const customFields = {
	usernameField: "uname",
	passwordField: "pw",
};

/*
+ Create our verifyCallback: Here we place our custom logic for 
  authenticating a user. Here passport expects the req.body to 
  have the 'username' and 'password' fields, and automatically
  passes those in for us. However, we can customize this and
  define what fields passport should be looking for.

- NOTE: Ultimately it doesn't matter what database or how we 
  authenticate. The authentication result ultimately depends
  on what we return when we call done()
*/
const verifyCallback = (username, password, done) => {
	User.findOne({ username: username })
		.then((user) => {
			/*
      - If no user pass null as the error and false as the user. Null
        means, no there wasn't an error with the server, and passing false
        for the user means the authentication failed or we rejected it anyways.

      + Validate the password against its hash: We have our custom validation function
        where we pass in the user inputted password, the hashed password 
        associated the username, and the salt that was originally used to 
        hash that password. Based on what's returned, passport will redirect
        the user based on the success and failure routes we created.

      - If the password is valid: return null for the error and user for 
        the user. This indicates to passport that no server error happened, and 
        the user was successfully authenticated. 
      - Else: return false for the user, indicating that the user wasn't 
        authenticated correctly.
      */
			if (!user) {
				return done(null, false);
			}

			const isValid = validatePassword(password, user.hash, user.salt);

			if (isValid) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
		.catch((err) => {
			return done(err);
		});
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

/*
+ Serializing and deserializing, and how it relates to express sessions: 
- Simple Explanation: About how we put a user into the session and 
  also grabbing them out. We put the user id into the session, and 
  when we want the user to come out, we grab the user id and find it
  in the database.
*/
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	User.findById(userId)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err);
		});
});
