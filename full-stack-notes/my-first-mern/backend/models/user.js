const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,

		/*
    - We'll say that each account has to be associated with 
      a unique email. This makes it so whenever we try to save a user into 
      the collection, and that new user has an email value that 
      already exists in the database, then we will throw an error.    
    */
		unique: true,

		/*
    - Automatically lowercases the email string. This makes it so 
      'myEmail@gmail.com' and 'myemail@gmail.com' will be seen 
      as the same email, so there's no shenanigans with casing
      and email duplication.
    */
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
});

/*
+ Static signup method: In this case 'this.' refers to 'User' model.
  So to use this you'd do User.signup(some_email, some_password).

1. Query in the database if any other user has that email.
2. If they do, then throw an error.
3. Create a random salt with an amount of salt rounds, 10 is the default choice
4. Hash the password and create/save user to the database.
5. Return the user that was just saved.


- NOTE: 
1. Remember since this is a static member 'this' refers to the model class itself. so
  using 'await this.findOne({...})' also means 'await User.findOne({...})'.

2. Static methods can sometimes help with reducing code repetition. Here it 
  makes some sense to make a static method that helps users get signed up. 
  Thinking about it from an object oriented approach I guess. In our static 
  methods here, we're passed emails and plaintext passwords, and here we handle
  the backend database interactions and validation when logging in or signing up.

3. It's definitely safest to have the validation at the root or core of where the signup is
  happening. Just so that we don't miss anything since this is where it directly goes in
  to the database.

- NOTE: Remember in order to use 'this' keyword, it can't be an arrow function.
*/
userSchema.statics.signup = async function (email, password) {
	// Check if fields actually have values and throw a human-readable error message
	if (!email || !password) {
		throw new Error("All fields must be filled!");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Email is not valid!");
	}

	// By default has to have at least 8 characters, 1 upper, 1 lower, and 1 symbol
	if (!validator.isStrongPassword(password)) {
		throw new Error("Password not strong enough!");
	}

	const exists = await this.findOne({ email });
	if (exists) {
		throw new Error("Email already in use!");
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await this.create({ email, password: hash });
	return user;
};

/*
+ Static login method


- NOTE: Remember that {some_value: some_value} is the same as {some_value}.
  The latter is just shorthand for the former.


*/
userSchema.statics.login = async function (email, password) {
	// Check both fields
	if (!email || !password) {
		throw new Error("All fields must be filled!");
	}

	// Fetch user
	const user = await this.findOne({ email });

	/*
  1. If no user was found, we can say 'incorrect email or password'
  2. Compare the plain text and hashed password to see if the plain text one hashes to the hashed one
  3. If they don't match, the user's password was wrong
  
  - NOTE: In a real application, in both cases throw the message "Incorrect email or password"
    as that's standard practice. But here we're just demonstrating for the tutorial/notes.
  */
	if (!user) {
		throw new Error("Incorrect email!");
	}
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error("Incorrect password");
	}

	// At this point, the credentials were correct so return the user
	return user;
};

module.exports = mongoose.model("User", userSchema);
