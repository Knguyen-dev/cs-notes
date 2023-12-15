import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { act } from "react-dom/test-utils"

import { Act_1, Act_2, Act_3, Act_4 } from "../ex3_act_api"

/*
    1. Create div
    2. Render Act_1 component inside of it, which should be a number.

    - Explanation: Even though we think the test to pass, it fails.
        React asynchronously renders the UI, let's see how this plays out:

    1. Initial Render, output from Act_1 is 0.
    2. expect().toBe() test is executed, and it sees our number is 0.
    3. A few ms later, effect runs and state is changed.
    4. re-renders and outputs 1.

    - Solution: The issue is the test is executed too early, and before 
    our effect actually runs We can use act api to ensure any state update
    or effect call will be executed inside, and before we actually do our
    tests.

    */
describe("Act Api", () => {
	/*
    - Without act, which doesn't wait for state or effects:
    it("Should render 1", () => {
		const el = document.createElement("div")
		render(<Act_1 />, el)
		expect(el.innerHTML).toBe("1")
	})
    */

	/*
    - With act, which waits for state updates and effects before testing
    1. Define div and render act_1 in it. However
        wrap the rendering in an act function to make sure 
        we wait until all state updates and effects are finished 
        running before moving on.
    2. Then make our assertion knowing that the component has
        finished state updates and effects. As a result
        this passes.

    Importance: Good for testing asynchronous
        stuff such as user interactions, apis, subscriptions firing, 
        and other things that changes something in your UI.
    */

	it("Should render 1", () => {
		const el = document.createElement("div")
		act(() => {
			render(<Act_1 />, el)
		})
		const renderedText = screen.getByText("1") // Use appropriate querying method to find the text
		expect(renderedText).toBeInTheDocument()
	})

	/*
    - Act fails when onClick = () => setCount(count + 1)
    - With multiple updates, batch updates happen and 
        so React may not have completed processing the first update before
        second one occurs. As a result, some updates in between are missed and 
        we just get the end result.
    - Solution: Use state updater function, which passes
        the test and gives us better code.
    */
	it("Should increment counter", () => {
		const el = document.createElement("div")

		document.body.appendChild(el)
		render(<Act_2 />, el)
		const btn = screen.getByRole("button")
		act(() => {
			for (let i = 0; i < 3; i++) {
				btn.dispatchEvent(new MouseEvent("click", { bubbles: true }))
			}
		})

		expect(btn.textContent).toMatch("3")
	})

	/*
    - sleep: Returns a promise that resolves after a period of time

    1. first expect waited until effect was finished executing.
        Since state setting was in a timer, it wasn't registered
        directly, so we don't wait for it in act.
    
    2. Now wait for a time just a little longer than the timer and 
        wrap that waiting in an act. This allows for the timer
        to run out and a state update get scheduled. Wrapping in 
        act ensures that we wait until state update finishes.
    
    3. Now make our assert statement knowing we both waited out the
        timer and the async function call for updating state.
    */
	it("Should tick to a new value", async () => {
		const sleep = (period) => {
			return new Promise((resolve) => setTimeout(resolve, period))
		}
		const el = document.createElement("div")
		act(() => {
			render(<Act_3 />, el)
		})

		let renderedText = screen.getByText("0")
		expect(renderedText).toBeInTheDocument()

		await act(async () => {
			await sleep(1100)
		})

		renderedText = screen.getByText("1")
		expect(renderedText).toBeInTheDocument()
	})
})
