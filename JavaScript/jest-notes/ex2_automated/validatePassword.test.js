/*
+ The takeaway behind automated testing: You can have a place to run code to check that your 
  validation code is passing a certain number of tests. As a result you don't have to do this manually.
  As a result, whenever we want to change our validatePassword function, after we make the change we 
  just run our script to run these test cases. Then we can see if our new changes work well or if something 
  broke, and if so what did.
*/
const validatePassword = require("./validatePassword");

test("Returns false for empty password", () => {
	expect(validatePassword("")).toBe(false);
});

test("Returns false for a password without numbers", () => {
	expect(validatePassword("<PASSWORD>")).toBe(false);
});

test("Returns for a password without letters", () => {
	expect(validatePassword("123456765")).toBe(false);
});

test("Returns true for a password between 8 to 12 characters", () => {
	expect(validatePassword("abba0987")).toBe(true); // 8 characters
	expect(validatePassword("scranb011s21")).toBe(true); // 12 characters
});
