const mongoose = require("mongoose");

// Get access to env file
require("dotenv").config();

// Create connection object
const connection = mongoose.connect(process.env.url);

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
	username: String,
	hash: String,
	salt: String,
	admin: Boolean,
});

const User = mongoose.model("User", UserSchema, "users");

// Export our stuff
module.exports = {
	connection,
	User,
};
