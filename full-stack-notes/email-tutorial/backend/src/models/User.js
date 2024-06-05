const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,

	// Have a boolean which indicates whether the email of the user has been verified or not
	// By dfeault this will be false
	isVerified: {
		type: Boolean,
		default: false,
	},
});

const model = mongoose.model("User", userSchema);
module.exports = model;
