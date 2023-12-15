import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ClassInput } from "../../component_notes/ex4_class_components"

/*
+ Let's simulate some tests to see if our ClassInput is correct.
    Here's an example of how we tested adding todos in our ClassInput component
*/

describe("Managing Todos", () => {
	it("Adding todos", async () => {
		const sampleTodos = [
			"Make pizza for holidays",
			"Order ingredients for cookout",
			"Decorate house",
		]
		const user = userEvent.setup()

		render(<ClassInput name="My Holiday" />)

		const input = screen.getByTestId("add-todo-input")
		const submitBtn = screen.getByTestId("add-todo-btn")
		const headingCount = screen.getByTestId("todo-count-heading")

		let todoCount = 0
		for (const todo of sampleTodos) {
			todoCount += 1
			await user.type(input, todo)
			await user.click(submitBtn)

			// Check if the count is rendering correctly
			expect(headingCount.textContent).toMatch(
				`All the tasks! Current Count: ${todoCount}`
			)

			// Check if the input for adding todos is empty after
			expect(input.value).toMatch("")

			// Check if there are a correct amount of list items (todo items)
			const todoItems = screen.getAllByRole("listitem")
			expect(todoItems.length).toBe(todoCount)
		}
	})
})
