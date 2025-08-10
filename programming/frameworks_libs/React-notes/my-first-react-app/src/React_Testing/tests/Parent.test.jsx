import { describe, it, expect, vi } from "vitest"
import Parent from "../Parent"
import { render, screen } from "@testing-library/react"

/* 
+ Here's an example of how we mock child components:
- Assume Parent has a child component called Child.
1. In vi.mock, provide the path to the child component. Then
	return our mocked childcomponent in a object like this.
2. Ensure Parent actually imports or at least utilizes the chlid component.
3. Write a test-suite, since we are testing the parent while abstracting the child. Then
	write your assertions, here we just test if it's being mocked correctly.

4. With this, you should be able to set up some more complicated mocks in the future


*/
// eslint-disable-next-line react/display-name
vi.mock("../Child", () => ({
	default: () => <div>Mocked Child Component</div>,
}))
describe("Parent", () => {
	it("renders with mocked Child component", () => {
		render(<Parent />)

		// Assert that ParentComponent renders
		const parentComponentText = screen.getByText("Parent Component")
		expect(parentComponentText).toBeInTheDocument()

		// Assert that mocked ChildComponent renders
		const mockedChildComponentText = screen.getByText("Mocked Child Component")
		expect(mockedChildComponentText).toBeInTheDocument()
	})
})
