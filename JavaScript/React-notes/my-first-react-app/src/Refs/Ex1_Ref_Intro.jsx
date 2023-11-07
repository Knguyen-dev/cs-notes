/*
+ Credits: https://react.dev/learn/manipulating-the-dom-with-refs



+ References Values with Refs: Whne you want a component to remember something, but don't need it to 
    trigger new renders.

- State vs Ref:
    1. Ref points to a number, while states could point to a string, object, function, etc.
    2. Don't read/write ref during rendering process, but can access it outside of rendering (explained more in ex.2).
        On the other hand, you can read states at any time, but each render has its own snapshot of state that doesn't change.
    3. Both are retained during re-renders, but changing a ref doesn't trigger a re-render. Also 
		changing a state changes the value on the text render, but changing a ref will change it immediately. Meaning 
		changing it will allow you to access that new value on the same render.

    - Takeaway: When info is used for rendering the component, make it a state. When information is only
        needed by an eventhandler and when we change it we don't need to re-render, probably better
        as a ref.

- How to use ref
    1. const ref = useRef(0); call useRef hook and pass an initial value 
    2. useRef returns this object:
    {
        current: 0; current represents the initial value you passed
    }
    3. Use ref.current to access the ref value, and refs are mutable, meaning 
        you can write to the ref too.

- When to use refs: Usually when stepping outside of React and communicating with external APIs or things that 
    won't impact the appearance of the component.
    1.  Storing timeout IDs
    2. Storing/Manipulating DOM elements
    3. Storing other things that aren't necessary for calculating JSX

- Best practices for refs:
    1. Treat refs as an escape hatch. Useful when working with external systems or APIs, but 
        if a lot of your logic and data relies on refs, probably re-think your approach.
    2. Don't read/write ref.current during rendering. If info is needed during rendering, use a state.
        React doesn't know when ref.current changes, so even reading it while rendering is unpredictable.
*/

import { useRef, useState } from "react"
import PropTypes from "prop-types"

/*
- Example 1: Using ref to make a counter. So updating ref won't trigger a re-render, and this 
    makes sense as it seems the markup doesn't depend on the ref.

    NOTE: See how we only write to ref in the handleClick function, is outside of the rendering process as
        the function isn't actually run.
*/
function Counter() {
	let ref = useRef(0)

	function handleClick() {
		ref.current = ref.current + 1
		alert("You clicked " + ref.current + " times!")
	}

	return <button onClick={handleClick}>Click me</button>
}

/*
- Example 2: Make two stop watches. One with only states, and the other with a ref.
    To display elapsed time we have startTime (time when pressed), and now (current time).
    After the user presses start we update the time passed every 10 miliseconds, which is faster 
    enough so it doesn't look bad.

*/

function WatchOne() {
	const [startTime, setStartTime] = useState(null)
	const [now, setNow] = useState(null)

	/*
    - When user presses 'start' record when we started and record
    the current time. Then every 10ms, we update the value of now,
    which will continue updating the time elapsed.
    */
	function handleStart() {
		setStartTime(Date.now())
		setNow(Date.now())

		setInterval(() => {
			setNow(Date.now())
		}, 10)
	}

	// If time values for the states are valid, get the amount of seconds passed
	let secondsPassed = 0
	if (startTime != null && now != null) {
		secondsPassed = (now - startTime) / 1000
	}
	return (
		<>
			<h1>Time passed: {secondsPassed.toFixed(3)}</h1>
			<button onClick={handleStart}></button>
		</>
	)
}

/*
- Example: Include a 'stop' button. To stop, we need to cancel the existing 
    setInterval so it stops updating 'now' state. We'll use clearInterval, but since it 
    needs an interval ID, we'll use ref to remember the most recent/previous setInterval

    NOTE: We only read/write the ref in the functions (outside of the rendering process), which 
        is the proper way to do it.
*/
function WatchTwo() {
	const [startTime, setStartTime] = useState(null)
	const [now, setNow] = useState(null)
	const intervalRef = useRef(null)

	function handleStart() {
		setStartTime(Date.now())
		setNow(Date.now())

		// Clear previous setInterval, so only one exists
		clearInterval(intervalRef.current)

		// Assign intervalRef to the current setInterval function.
		// Then every 10 ms our setInterval will update the now state value.
		intervalRef.current = setInterval(() => {
			setNow(Date.now())
		}, 10)
	}

	// Create the function to handle when the user presses the stop button
	function handleStop() {
		clearInterval(intervalRef.current)
	}

	let secondsPassed = 0
	if (startTime != null && now != null) {
		secondsPassed = (now - startTime) / 1000
	}
	return (
		<>
			<h1>Time passed: {secondsPassed.toFixed(3)}</h1>
			<button onClick={handleStart}>Start</button>
			<button onClick={handleStop}>Stop</button>
		</>
	)
}

/*
- Example 3: We have "debounced" buttons. Every time you click it a message will appear 3 seconds later.
	They are debounced in the sense that if you keep clicking, it keeps reseting the message and the time to send it, so you actually
	have to stop clicking to see the message. Here we're using refs to keep track of the timeoutID so that 
	even the user clicks hte button multiple times, they won't get multiple messages, but just one. 

	NOTE: Remember that keeping track of timeoutID is good for refs, as these types of values 
		won't affect the rendering of the components themselves.
*/

function DebouncedBtn({ onClick, children }) {
	const timeoutID = useRef(null)
	return (
		<button
			onClick={() => {
				// Clear the current time out
				clearTimeout(timeoutID.current)

				// Set and create a new time out
				timeoutID.current = setTimeout(() => {
					onClick()
				}, 1000)
			}}
		>
			{children}
		</button>
	)
}
DebouncedBtn.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.element,
}

/*
- Last example: How about a send chat button. Usually it would the thing that it got at the time of sending, 
	but what if after we press send, it just sends content of the chat if we changed it.
*/

function Chat() {
	const [text, setText] = useState("")
	const textRef = useRef(text)

	function handleChange(e) {
		setText(e.target.value)
		textRef.current = e.target.value
	}

	function handleSend() {
		setTimeout(() => {
			alert("Sending: " + textRef.current)
		}, 3000)
	}

	return (
		<>
			<input value={text} onChange={handleChange} />
			<button onClick={handleSend}>Send</button>
		</>
	)
}

export { Counter, WatchOne, WatchTwo, Chat }
