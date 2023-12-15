import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CustomButton } from "../ex2_mocking"
import { describe, it, expect, beforeEach } from "vitest"

/*
- Creating test suite for our CustomButton component.
*/
describe("CustomButton", () => {
	/*
    - Using beforeEach: Since we use a mock funciton
    mockClick in 2 test cases, we can remove repetition
    by creating that variable everytime before a test case.
    
    NOTE: beforeEach is useful when your test file 
        is long and can be greatly reduced due to the 
        repetition. Else, it's recommended we just set 
        up your mocks in each test block.
    */
	let mockClick
	beforeEach(() => {
		mockClick = vi.fn()
	})

	/*
    - Create a test case to see if component renders and commits as expected
    1. Render button
    2. Query button node from dom
    3. Using jest matcher, check if it's on the testing DOM 
    */
	it("Should render a button with text 'Click Me'.", () => {
		render(<CustomButton onClick={() => {}} />)
		const btn = screen.getByRole("button", { name: "Click Me" })
		expect(btn).toBeInTheDocument()
	})

	/*
    - Create a test case to see if function was called when btn was clicked
    1. Create mock function using one of Vitest's functions and 
        pass it as the onClick function.
    2. Render button and get it as a node
    3. Simulate button click and check if mockClick was called.
    */
	it("Should call function when btn is clicked", async () => {
		const user = userEvent.setup()
		render(<CustomButton onClick={mockClick} />)

		const btn = screen.getByRole("button", { name: "Click Me" })
		await user.click(btn)
		expect(mockClick).toHaveBeenCalled()
	})

	/*
    - Create test case to make sure function is not somehow called
        even when no clicks happen.
    1. Create a mock function for clicking
    2. Render button and check if the mock function
        was called.  
    */
	it("Shouldn't call function when it isn't clicked", async () => {
		render(<CustomButton onClick={mockClick} />)
		expect(mockClick).not.toHaveBeenCalled()
	})
})
