import { cloneArray } from "../src/cloneArray"
test("Clones an array", () => {
    const myArr = [1, 2, 3]

    // Test if array values are equal
    expect(cloneArray(myArr)).toEqual(myArr)

    // Test if array is really a clone and they're in separate memory addresses
    expect(cloneArray(myArr)).not.toBe(myArr)
})
