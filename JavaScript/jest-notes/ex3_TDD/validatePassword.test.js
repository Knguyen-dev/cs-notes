/*
+ How to do:
1. write test. Then update function. 
2. If our test passes, then we never have to touch that 
  test again. We keep making tests to make our function more 
  complete.



*/
const validatePassword = require("./validatePassword");

test("return false given an empty string", () => {
	expect(validatePassword("")).toBe(false);
});

test("return true given a password 8 characters or longer, a letter, and a number", () => {
	expect(validatePassword("1234asdf")).toBe(true);
	expect(validatePassword("1234AsdF")).toBe(true);
});

test("return false given a string with only numbers", () => {
	expect(validatePassword("1234567890")).toBe(false);
});

test("return false given a string with only letters", () => {
	expect(validatePassword("asdfjklsdf")).toBe(false);
});
