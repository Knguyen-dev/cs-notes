const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
	// Path to our file
	path: {
		type: String,
		required: true,
	},
	// Original name it had; needed since multer randomizes/hashes the names
	originalName: {
		type: String,
		required: true,
	},
	// An optional password which is just the string
	password: String,
	// Number of times the file has been downloaded. By default it's zero because
	// when we first upload the file, no one has downloaded it yet.
	downloadCount: {
		type: Number,
		required: true,
		default: 0,
	},
});

module.exports = mongoose.model("File", fileSchema);
