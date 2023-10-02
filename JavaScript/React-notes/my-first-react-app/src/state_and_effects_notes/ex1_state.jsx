/*
+ Lesson 4: The state, a component's memory. Webpages need to chnage what's on screen due to a ninteraction.
    Things such as clicking 'next' on an image carousel, clicking the buy button to put it in a shopping cart,
    or the input value on an input field. Components need to 'remember' things such as the current image, the product/shopping cart, 
    etc. 

- Hooks: Special functions that let your components use React specific features. We add states with one of these special hooks.
	
+ How to add a state to a component:
1. Add a state with a 'useState' Hook, which lets you declare a state variable. 
2. It takes an initial state/value, and then returns a pair of values: current state and state setter function that lets you update it.

	- NOTE: It's a good idea ot have multiple state variables for unrelated data, such as index or showDetails in the gallery
	example. However for a form, it could be a good idea to have a single state variable, an object, that records input data
	for each field.


+ How the rendering process works:
- Theory: In React, when a component's state or props change, the component is destroyed and recreated
	from scratch, which includes any variables, functions, React Nodes, etc. When it's recreated
	it only remembers the latest state value returned from 'useState', basically initial state
	value is used for the first render, and ignored on subseuqent renders. Then the rest of your 
	code would be locally defined variables, functions, etc. it'll re-create those, the markup, and return it for rendering.
	This is React's process of re-rendering.

1. "const [index, setIndex] = useState(0)" after defining the state the component renders for the first time
2. Then updating the state with 'setIndex', React triggers another render.  
3. React still sees the line for "useState(0)", but it remembers that you changed the index, and uses the 
	remembered index instead.
4. Then the rest of your code runs, so local variables are set, and then your new markdown is created and returned for rendering



+ States are isolated/private to a component instances. Meaning if you render/create two instances of the same 
    component, each of them will have their own state individual variables. Changing the states of one isntance
	won't change the instances of the other, which makes sense.


- Pitfalls: Hooks start with the 'use' keyword, and only call them at the top level of your components, or eventually your own hooks. You
	can't use them inside loops, conditions, or other nested functions.
*/

import { useState } from "react"
import { sculptureList } from "./data.js"
/*
- Example 1: An image gallery that displays images of sculptures, it uses and updates React states as well.

1. We want our Gallery to know/remember the current image it's on and whether it's showing more details about an image.
    We'll make these states. We'll also make a boolean that determines whether we're at the last image or not, but we 
    can have this as a regular boolean.

2. handleDetailsClick: For handling displaying the details of the image, basically our event listener function. 
    Since this'll toggle the state of whether it's opened or closed, we can cleverly set the boolean to the opposite
    of what it currently is.

3. handleNextClick: Handles displaying the next image, again it just updates the state of the index. We can just
    use the setter to increment the 'index' state.

4. Define 'sculpture', the current object that contains the sculpture information we'll display.

5. After we've defined all of our states, functions, and variables, return markup for our component.
    We create the buttons and set up their click event listeners. We also fill in some information
    with the details from the sculpture object. Finally we do some conditional operations to change some text, or add
    some extra markup if needed
*/
function Gallery() {
	const [index, setIndex] = useState(0)
	const [showDetails, setShowDetails] = useState(false)
	const hasNext = index < sculptureList.length - 1

	function handleDetailsClick() {
		setShowDetails(!showDetails)
	}

	function handleNextClick() {
		if (hasNext) {
			setIndex(index + 1)
		} else {
			setIndex(0)
		}
	}

	let sculpture = sculptureList[index]
	return (
		<>
			<button onClick={handleNextClick}>Next</button>
			<h2>
				<i>{sculpture.name}</i> by {sculpture.artist}
			</h2>
			<h3>
				({index + 1} of {sculptureList.length})
			</h3>
			<button onClick={handleDetailsClick}>
				{showDetails ? "Hide" : "Show"}
			</button>

			{showDetails && <p>{sculpture.description}</p>}

			<img src={sculpture.url} alt={sculpture.alt} />
		</>
	)
}

export default Gallery
