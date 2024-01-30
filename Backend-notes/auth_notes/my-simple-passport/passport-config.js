/*
+ We'll create a file with how we authenticate with passport
*/

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail) {
	const authenticateUser = async (email, password, done) => {
		// You fetch your user from your database
		const user = getUserByEmail(email);

		/*
    + If no user was found, we use done to indicate
      we're finished with the authentication process.
    1. error: Here we pass null, no error occurred on the server's 
      part at least.
    2. user: For this argument we pass in false because we didn't find a user 
    3. Here we indicate the error message that we want to be shown when 
      this authentication condition isn't met.
    */
		if (user == null) {
			return done(null, false, { message: "No user with that email" });
		}

		/*
    1. If input password hashes to the stored hashed password, then
      it was successful. Here we pass null and user, meaning there was 
      no error, and user to indicate that's the user that was authenticated.
    2. Else, when bcrypt tried to hash 'password' it didn't match user.password, 
      which is our hashed password.
    3. Return and pass in our error object to indicate that there was a server
      error.
    */
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: "Password incorrect" });
			}
		} catch (e) {
			return done(e);
		}
	};

	// Encoding and decoding of sessions with the id of the user
	// So the id is the serialized/encoded representation of our user
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id));
	});

	/*
  +

  1. usernameField: What is the username of the user. Here we say
    it's called 'email'. Here we set up so that we authenticate 
    by letting the user pass in their username and email.
  2. passwordField: By default this is set to 'password', so 
    we don't need to be explicit about it.
   */

	passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
}

module.exports = initialize;
