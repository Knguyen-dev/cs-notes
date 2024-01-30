/*


+ File where we validate and generate passwords with crypto library



*/

const crypto = require("crypto");

function genPassword(password) {
	// Create random hash
	const salt = crypto.randomBytes(32).toString("hex");

	// Create the hash for the password with the salt
	const hash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");

	return {
		salt,
		hash,
	};
}

function validatePassword(password, hash, salt) {
	// Hash the user's plaintext password
	const hashVerify = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");

	// Return whether the hash that comes from the password the user created is the same as the hash
	// that was created in the database
	return hashVerify === hash;
}

module.exports = {
	validatePassword,
	genPassword,
};
