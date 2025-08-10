/*
+ Asynchronous Apis: Asynchronous apis are 
  just functions that take a variable time to complete
  and are run in the background rather than run in sequence.

- For a synchronous api, each operation must be completed
  before running the next. While an async will run 
  and schedule an operation to be completed, returning immediately even
  before the operation completes. This allows for other sequential operations
  to run while the async operations are still happening. 

- With async apis, we register callbacks with them, so these 
  callbacks will be executed when the operation completes. This
  is how the apis notify the application that it has been completed.
  Though, now we use things suc has async and await to convert our 
  async code into promises and avoid callback hell.

+ Error first callbacks: The convention when using Node and Express
  is to use error-first callbacks. So the first value in your callback
  functions should be an error value, whilst subsequent arguments can 
  represent success data. Essentially, a dependable callback pattern 
  is crucial since Node.js relies on async code. Without it developers
  would be stuck maintaining different signatures and styles between
  every module. So the error-first pattern solved this problem, and 
  became today's standard. Every use-case has different requirements,
  but the error-first pattern accomodates all of them.

+ How to define an error-first callback:
1. The first argument of the callback is the error object.
  If an error happened, it will be returned by the 'err' arg.
2. The second argument of the callback is reserved for any 
  successful response data. If no error happened, 'err' is set to 
  null and successful data is returned by second argument.
*/

const fs = require("fs");

function ex1() {
	fs.readFile("/foo.txt", function (err, data) {
		// If an error happened, handle it (throw, propagate, etc.)
		if (err) {
			console.log("Unknown error!");
			return;
		}
		// Otherwise log file contents
		console.log(data);
	});
}

// Callbacks can be called in parallel with the async library
function strictAdd(x, y, callback) {
	if (typeof x !== "number") {
		callback(new Error("First argument is not a number"));
		return;
	}
	if (typeof y !== "number") {
		callback(new Error("Second argument is not a number"));
		return;
	}
	var result = x + y;
	setTimeout(function () {
		callback(null, result);
	}, 500);
}

function myCallback(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(data);
}

// You can call it like this
strictAdd(2, 10, myCallback); // 12
strictAdd(-2, 10, myCallback); // 8
strictAdd("uh oh", 10, myCallback); // Error = "First argument is not a number"
strictAdd(2, "10", myCallback); // // Error = "Second argument is not a number"

async.parallel(
	{
		twelve: function (callback) {
			strictAddition(2, 10, callback);
		},
		fiftythree: function (callback) {
			strictAddition(42, 11, callback);
		},
		six: function (callback) {
			strictAddition(23, -17, callback);
		},
	},
	function (err, results) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(results); // {twelve: 12, fiftythree: 53, six: 6}
	}
);
