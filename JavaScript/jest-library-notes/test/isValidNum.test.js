/*
- Here's how we do unit testing with multiple test cases. We're testing a validation function and we want 
    to pass in multiple test cases to it. We use 'describe' and 'test.each' to do this. 
  
With test.each, we can structure our cases in an array, with our arguments, and then the expected value. This makes testing 
a lot faster if you have utility functions like these.


*/

import { isValidNum } from "../src/isValidNum"

describe("Testing validity of numbers", () => {
    const numbers = [
        [20, true],
        [21, true],
        [22, true],
        [23, true],
        [19, false],
        [24, true],
    ]
    test.each(numbers)("Number %i should be valid: %s", (num, expected) => {
        // const result = isValidNum(num)
        expect(isValidNum(num)).toBe(expected)
    })
})
