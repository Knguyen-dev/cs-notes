/*
+ Testing asynchronous code: This isn't as straightforward, but possible.
There are three ways to test asynchronous code:
1. Promises
2. Async/Await
3. Callbacks



*/

/*
- Simulate a request for data, that takes 1 second. So after one 
  second, we 'got the data'. Our callback accepts our data as an argument
  so after one second, we get our data.

*/
function fetchData(callback) {
	setTimeout(() => {
		callback("peanut butter");
	}, 1000);
}

function fetchPromise(url) {
	return new Promise((resolve, reject) => {
		// After 1 second, the promise resolves
		setTimeout(() => {
			if (url === "good") {
				resolve("peanut butter");
			} else {
				reject(new Error("Url not valid!"));
			}
		}, 1000);
	});
}

module.exports = { fetchData, fetchPromise };
