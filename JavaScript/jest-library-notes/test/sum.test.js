import { sum } from "../src/sum"
/*
1. Write a description of what you're testing.

2. Using expect, we put in the parameters we want, and then we also 
    enter what the correct result of the function would be (expected output).
    So "we expect sum(1,2) to return 3", and if it does the function passes, else
    it doesn't.

*/

test("Adds two numbers", () => {
    expect(sum(1, 2)).toBe(3)
})
