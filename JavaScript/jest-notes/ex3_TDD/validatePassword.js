/*
- As a result, every piece of code in this function is designed to take 
  care of a certain test case.

*/
function validatePassword(password) {
	const validLength = password.length >= 8;
	const containsLetter = /[a-zA-Z]/g.test(password);
	const containsNumber = /[0-9]/g.test(password);

	return validLength && containsLetter && containsNumber;
}

module.exports = validatePassword;
