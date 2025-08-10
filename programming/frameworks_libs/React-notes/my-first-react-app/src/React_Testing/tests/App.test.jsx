/*
+ Importances of Querying By Role: The importance is that by querying ByRole ensures that our UI is accessible to 
    everyone whether they use a mouse or other assistive technologies.

+ Types of queries
1. getBy: Returns matching node. Returns error if nothing is found or if there are multiple matches
2. queryBy: Returns matching node. Returns null if no match. Returns an error if there are multiple matches.
3. findBy: Returns a Promise which resolves if element is found, and rejected if 
    nothing is found or multiple elements are found after a 1 second timeout.

- NOTE: If you're wanting to select multiple elements use getAllBy, queryAllBy, or findAllBy.
1. getAllBy: Returns an array of nodes, or throws an error if nothing matches
2. queryAllBy: Returns array of nodes, or empty array if nothing matches
3. findAllBy: Returns promise that resolves into array of elements, or rejects 
    when nothing is found after 1 second timeout.


Priority (Best options to query the tree with):
1. getByRole: Queries all elements in accessibility tree, which is a tree based on the DOM tree but for accessibility 
    related information. So to query for DOM nodes, we query by their accessibility 'roles' instead.
    Use the 'name' option to filter elements by their accessible name. Typically should be the goto pick, and
    here's a list of roles to help you with querying.

    NOTE: 
    1. Accessible name is text dictated by aria-label, aria-labelled-by, or the text content 
        of the element. For buttons, since aria-label and aria-labelledby are usually absent, 
        the browser and accessibility standards use the text content as the name. 

    List of roles: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles
    CheatSheet for queries: https://testing-library.com/docs/dom-testing-library/cheatsheet/

2. getByLabelText: Really good for form fields since those have labels 
3. getByPlaceholderText: Not supposed to be a substitute for getByLabelText, but if you don't 
    have a label in the DOM, then this is a good alternative.
4. getByText: Can be used for finding non-interactive elements usch as divs, spans, paragraphs, etc.
5. getByDisplayValue: Used for querying by the current value of a form element
6. getByAltText: Queries for alt text.

NOTE: We use "screen" because it's easier, and without it we'd need to use a container.
    Base queries from DOM Testing Library require you give a container, and most frameworks 
    do this for you. Main takeaway is using screen is recommended.
    For example:

- With Screen:
const inputNode = screen.getByLabelText("Username")

- Without Screen:
const container = document.querySelector("#app") // query for our app node
const labelNode = getByLabelText(container, "Username") // query for a label with text "Username"


+ Simulating User Events: Of course live user feedback/interaction is good, but building
    confidence through tests is good too


*/

import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { App } from "../ex1_intro"

/*
Example 1: In this test, we're seeing testing our App class actually rendered a heading markup with 
1. Render our app on our testing DOM
2. One way is to query the heading node and get its text content, and see if its text matches. In order to 
    test if our heading rendered correctly.
3. The other way, using name, is to see if there exists a heading node with name or text 'Our First Tst"est

describe("App component", () => {
	it("Renders correct heading", () => {
		render(<App />)
		// expect(screen.getByRole("heading").textContent).toMatch(/our first test/i)
		expect(
			screen.getByRole("heading", {
				name: /Our First Test/i,
			})
		)
	})
})
*/

/*
- Example 2: Testing user events
1. 

*/

describe("App Component", () => {
	/*

    + Snapshot testing: Comparing our rendered component with an associated snapshot file. When
        running this test, an associated snapshot file rendered, which captured the markup of the App component
        on our virtual DOM. A snapshot test is testing if our markup output is matching the previous snapshot of
        our markup.

    - render(<App/>):
        1. Renders app component in a virtual DOM for testing purposes.
        2. Render() also returns an object with a property 'container' which is a reference to
            the root DOM node that contains the App component's markup. So container is our current DOM output.
    - toMatchSnapshot(): Takes a snapshot of the currently rendered output in our virtual DOM, and compares it something. 
        If there is no previous snapshot, it takes a snapshot of our current DOM.
        
        
    - How it works: So on our initial run, no previous snapshot so it takes a snapshot of the current DOM. Then 
        we compared container to match that said snapshot of our markup. This should test if the markup of 
        the snapshot in the __snapshots__ folder, matches 'container', which passes. Then on subsequent runs,
        we continue to compare our container against previously stored snapshot 
 

    - Importance: May seem dumb, but the idea is checking "hey is this component rendering consistently with the 
        same information?". Snapshot testing is more pure ocmponents that render UI based on props. Things 
        that don't rely on complex logic or fetching varying data. Here it passes because we intended and designed
        our component to be pure, and not render varying markup everytime.


    NOTE: If you markup for your component while snapshot testing, in this case it'll fail because it's testing if 
        our current newly changed markup is the same as the old snapshot taken in the past. However, you'll get 
        an option to update the snapshot to match the new markup so that tests run well.
    */
	it("renders magnificent monkeys", () => {
		const { container } = render(<App />)
		expect(container).toMatchSnapshot()
	})

	/*
    + Simulating User Events: Here we're simulating a click event. Then we check if the heading's text
        has changed with 'toMatch', which is one of the various assertions we could have used.

    NOTE: 
        1. Callback function is asynchronous because user.click() simulates the asynchronous nature
        of user interaction.

        2. always do userEvent.setup() before rendering the component that you're testing. 

        3. React Testing Library unmounts the rendered components after every test. 
            This is why we're rendering the App on every test case.
    */
	it("render radical rhinos after button click", async () => {
		const user = userEvent.setup()
		render(<App />)
		const button = screen.getByRole("button", { name: "Change Text" })
		await user.click(button)
		expect(screen.getByRole("heading").textContent).toMatch(/radical rhinos/i)
	})
})

/*
- Extra for simulating events: You can also simulate keyboard events if needed.

1. simulates user pressing certain keys 
2. Using brackets. Like the first, we aren't keeping any keys pressed, so we are lifting Shift
    before pressing f.
- More can be found on Docs: https://testing-library.com/docs/user-event/intro


const user = userEvent.setup()
await user.keyboard('foo'); user presses f, o, o
await user.keyboard('{Shift}{f}{o}{o}'); Shift, f, o, o




*/
