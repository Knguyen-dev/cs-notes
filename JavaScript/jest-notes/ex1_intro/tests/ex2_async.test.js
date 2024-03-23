const { fetchData, fetchPromise } = require("../ex2_async.js");

/*
- Ex. 1: Here's our first example of testing asynchronous operations, 
  when we're working with asynchronous functions that use callbacks.
*/
test("The data is peanut butter", (done) => {
	/*
  - We have the assertion in the function that we pass
   as a callback. This callback accepts our data.
  */
	function callback(data) {
		try {
			expect(data).toBe("peanut butter");
			done(); // indicate test is completed or 'done' without errors.
		} catch (err) {
			done(err); // indicate test had an error.
		}
	}

	fetchData(callback);
});

/*
- Ex. 2: With promises it's a little simpler. Here 'fetchPromise()'
  will be a promise, but we wait until it resolves to something 
  before using 'toBe' to compare the data (strings in this case).
*/
test("The data is peanut butter (promise)", () => {
	return expect(fetchPromise("good")).resolves.toBe("peanut butter");
});

/*
- Ex. 2: Let's test for the case when the promise is rejected. So 
  when a promise will reject into an error specifically, it will throw an error.

- NOTE: If you use async/await, rejected promises will throw an error and trigger 
  that catchblock, regardless of whether or not the rejected value is an error or like 
  a string.
*/
test("The promise fetch fails", () => {
	return expect(fetchPromise("bad")).rejects.toThrow();
});

/*
- Ex. 3: Let's use async await to test asynchronous functions. Of course you
  may prefer using this, 
*/

test("the data is peanut butter with 'async-await'.", async () => {
	// Wait until promise is resolved
	const data = await fetchPromise("good");

	expect(data).toBe("peanut butter");
});
