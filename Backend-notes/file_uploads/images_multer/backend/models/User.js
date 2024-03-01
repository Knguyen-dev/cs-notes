const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	image: String,
});

module.exports = mongoose.model("User", userSchema);
