/*
- Credits: https://react.dev/learn/choosing-the-state-structure
+ Principles of structuring/creating states:

1. Group related states: If you're updating multiple state variables at the same time, probably merge them into one variable.
2. Avoid contradictions: If you have several values or pieces of the state, try not to make them disagree with each other.
3. Avoid redundancy: Data that has already been calculated from props or existing states likely don't need to be states themselves
4. Avoid duplication: Try not to have the same data exsting in multiple state varaibles. We should keep them in one to keep things in sync.
5. Avoid deeply nested states: A deeply hierarchy state is hard to update, structure states flatly, which could mean making extra variables.

Pitfall: Remember if your state variable is an object you can't just update one key and leave the rest the same. You must 
    copy over the same values again. 

    Bad: setPosition({x: 100}); 

    Good: setPosition{...position, x:100}; copies over other fields and then reassigns x key's value


*/

import useState from "react"

/*
- Example 1: User moves mouse on screen, and that changes the position of a red dot on the screen.
    Both approaches are valid for making the states, but if two state variables are always changing together, 
    then it's likely better to unify them into one variable. This is os that you're probably won't 
    forget one or the other, and you use one function to update them both and keep them in sync.
*/
function Rule1() {
	// const [x, setX] = useState(0)
	// const [y, setY] = useState(0)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	return (
		<div
			onPointerMove={(e) => {
				setPosition({ x: e.clientX, y: e.clientY })
			}}
			style={{
				position: "relative",
				width: "100vw",
				height: "100vh",
			}}
		>
			<div
				style={{
					position: "absolute",
					backgroundColor: "red",
					borderRadius: "50%",
					transform: `translate(${position.x}px, ${position.y}px)`,
					left: -10,
					top: -10,
					width: 20,
					height: 20,
				}}
			></div>
		</div>
	)
}

/*
- Example 2: Pretend this is for a fun form. While making two states 'isSending' and 'isSent' can work perfectly, we 
    could forget to call some setters, and maybe isSending and isSent are both true, which is a CONTRADICTION.
    If we know that isSending and isSent can't be true at the same time, it's better to replace them
    with one state variable (status), maybe with states "typing", "sending", and "sent". 
*/
function Rule2() {
	// eslint-disable-next-line no-unused-vars
	const [text, setText] = useState("")
	const [status, setStatus] = useState("typing")
	// const [isSending, setIsSending] = useState(false)
	// const [isSent, setIsSent] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		setStatus("sending")
		await sendMessage(text)
		setStatus("sent")
	}

	const isSending = status === "sending"
	const isSent = status === "sent"

	return (
		<form onSubmit={handleSubmit}>
			{isSending}
			{isSent}
		</form>
	)
}

function sendMessage() {
	return new Promise((resolve) => {
		setTimeout(resolve, 2000)
	})
}

/*
- Example 3: Avoid redunancy if you see it. If a value can be created from existing states or props, it 
    likely doesn't need to be a state itself. fullName doesn't need to be a state as the firstName and lastName
    state can calculate exactly what value it needs to be.

*/
function Rule3() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	// const [fullName, setFullName] = useState("")
	const fullName = firstName + " " + lastName

	function handleFirstNameChange(e) {
		setFirstName(e.target.value)
	}
	function handleLastNameChange(e) {
		setLastName(e.target.value)
	}

	return (
		<>
			<h2>Checking in</h2>
			{/* Spaces between labels for aesthetics */}
			<label>
				First name: <input value={firstName} onChange={handleFirstNameChange} />
			</label>
			<label>
				Last name: <input value={lastName} onChange={handleLastNameChange} />
			</label>
			<p>
				Your ticket will be issued to: <b>{fullName}</b>
			</p>
		</>
	)
}

const initialItems = [
	{ title: "pretzels", id: 0 },
	{ title: "crispy seaweed", id: 1 },
	{ title: "granola bar", id: 2 },
]

/*
- Example 4: You could have selectedItem as a state, which would represent one of the objects 
    in the items array. This would mean we kind of duplicated the state values, and there's a chance you could forget update selectedItem.
    It's a small risk, but a good practice is to reduce duplication, and maybe have 'selectedID' as a value instead, and this 
    avoids duplication of state values.
*/
function Rule4() {
	const [items, setItems] = useState(initialItems)
	// eslint-disable-next-line no-unused-vars
	const [selectedID, setSelectedID] = useState(0)

	// eslint-disable-next-line no-unused-vars
	const selectedItem = items.find((item) => item.id === selectedID)

	// eslint-disable-next-line no-unused-vars
	function handleItemChange(id, e) {
		setItems(
			items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						title: e.target.value,
					}
				} else {
					return item
				}
			})
		)
	}
	return <></>
}

/* 
- Example 5: If you have a complex array of objects, and you're planning to use that object as a state
    then a good way is to structure it as a map like this. 

*/

// eslint-disable-next-line no-unused-vars
const goodObject = {
	0: {
		id: 0,
		title: "(Root)",
		childIds: [1, 42, 46],
	},
	1: {
		id: 1,
		title: "Earth",
		childIds: [2, 10, 19, 26, 34],
	},
}

export { Rule1, Rule2, Rule3, Rule4 }
