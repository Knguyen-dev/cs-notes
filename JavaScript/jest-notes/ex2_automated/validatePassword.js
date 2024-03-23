function validatePassword(password) {
	const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,12}$/;
	let validPassword = false;
	if (regex.test(password)) {
		validPassword = true;
	}
	return validPassword;
}

module.exports = validatePassword;
