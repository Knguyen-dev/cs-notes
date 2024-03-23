function sum(a, b) {
	return a + b;
}

function myFunction(input) {
	if (typeof (input !== "number")) {
		throw new Error("Invalid input!");
	}
}

module.exports = { sum, myFunction };
