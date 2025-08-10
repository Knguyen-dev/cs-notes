/*
+ Vitest comes with test suites (describe), test cases (it), and assertions (expect().toBe()).
    This will look familiar if you've been using Jest, because vitest acts as a replacement.

- describe: Here you create a test suite and describe what you're testing, and then put in
    one or more test cases that you want to see.

- it: Represents a singular test case. Of course you describe what 
    you're testing, and then write the code for it.



*/

import { describe, it, expect } from "vitest"

describe("something truthy and falsy", () => {
	it("true to be true", () => {
		expect(true).toBe(true)
	})

	it("false to be false", () => {
		expect(false).toBe(false)
	})
})
