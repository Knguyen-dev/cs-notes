/*


+ Matchers:
1. toBe(): Used for primitive types, so if dealing with  numbers, 
  strings, and booleans, you use toBe.

2. toEqual(): For comparing the values of objects or arrays.
3. toBeFalsy(): For checking if something is a falsy value. So 
   false, 0, "", null, undefined, etc.
4. toBeTruthy(): For checking if something is a truthy value
5. toThrow: We use this to check whether a function threw an error.
   
  

*/

const { sum, myFunction } = require("../ex1_matchers");

/*
- Ex. 1: Examples of using toBe to compare primitive types 
  such as numbers.

*/
test("Adds 1 + 2 to equal 3", () => {
	expect(sum(1, 2)).toBe(3);
});

/*
- Ex. 2: Using toEqual to compare two objects. Here we 
  check that two objects have the same keys and values.
*/
test("object assignment", () => {
	const data = { one: 1 };
	data["two"] = 2;
	expect(data).toEqual({ one: 1, two: 2 });
});

/*
- Ex. 3: Here we check if 'n' is falsy, which passes because
  it is true, and it is falsy like we expected.
*/
test("null is falsy", () => {
	const n = null;
	expect(n).toBeFalsy();
});

/*
- Ex. 4: Using the 'toBeTruthy' matcher to check if a value is 
  truthy.
*/
test("One is truthy", () => {
	const n = 1;
	expect(n).toBeTruthy();
});

/*
- Ex. 5: Using the 'toThrow' matcher to check if a function 
  threw an error. So you'll notice this test passes when we 
  pass a string into myFunction because that causes it to throw
  an error. However, when we pass a number into myFunction this 
  test case fails because that is valid input that won't cause 
  it to throw an error.
*/

test("function throws error", () => {
	// Create function to call the function with invalid input
	// So this function should throw an error
	const fn = () => myFunction("Bad input");

	// Then test if our function throws an error
	expect(fn).toThrow();
});
