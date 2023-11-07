/*
+ Manipulating the DOM with Refs: React automatically updates DOM based on your components, but 
    sometimes you may want to access some DOM elements managed by react. For example:
    focus on a node, scroll to it, get its dimenesions, etc. This isn't built into react,
    so we need a ref to the DOM element.


- Accessing DOM node using ref
    1. const myRef useRef(null); declare ref inside a component
    2. <div ref={myRef}>; pass ref to the DOM node you want to track
    3. myRef.current now contains said element, courtesy of react.
    4. Now you can do browser apis (built-in browser functions) such as "myRef.current.scrollIntoView()"


- Ref callback function:
    1. <div ref={(node) => console.log(node)} />; instead of passing a ref object, pass a function
    2. When <div> is added to DOM, React calls the ref callback with the DOM node as an argument.
        When <div> is removed from DOM, React will call the ref callback with null. 
    3. Ref callback function does not return anything.

- Accessing another component's DOM nodes
    1. When passing ref to a built-in component such as <input />, React sets ref.current to the DOM Node.
    2. When passing ref to a custom component, like <MyInput />, React sets ref.current to null.
        React doesn't let a component access the DOM nodes of other components. This is because 
        refs should be used sparingly as an 'escape hatch' and manuallly manipulating another 
        component's DOM nodes is dangerous.
    3. To allow the passing of refs to custom components, DOM nodes must give permission
        with the forwardRef API.




*/

/*
- Example 1: Have a button to focus on an input element on click. Our handleClick will focus 
    on the input element in inputRef.current. Then in our markup, we pass the inputRef to that 
    input element, which tells React to make that dom element inputRef.current
*/

import { useRef, forwardRef } from "react"

function Form() {
	const inputRef = useRef(null)

	function handleClick() {
		inputRef.current.focus()
	}

	return (
		<>
			<input ref={inputRef} />
			<button onClick={handleClick}>Focus on input</button>
		</>
	)
}

/*
- Example 2: Having a ref to each item in a list.


- Bad code: You can only call hooks at the top-level of your component. Can't do it in 
    a loop, condition, or inside a map call.
    <ul>
    {items.map((item) => {
        // Doesn't work!
        const ref = useRef(null);
        return <li ref={ref} />;
    })}
    </ul>

- Solution: Pass a function to the ref attribute (a ref callback function). Then react will
    call that function with the DOM node when we set the ref, and null when it's time to clear it. 
    Basically it lets us have a array or map, and access any ref by index or an ID.
*/

// Array of objects in form {id: some_value, imageUrl: some_url} that represent cat pictures
const catList = []
for (let i = 0; i < 10; i++) {
	catList.push({
		id: i,
		imageUrl: "https://placekitten.com/250/200?image=" + i,
	})
}

function CatFriends() {
	const itemsRef = useRef(null) // will be a map that maps itemID to a dom node

	function scrollToID(itemID) {
		const map = getMap() // Get itemsRef.current map
		const node = map.get(itemID) // Get node in the map that matches itemID
		node.scrollIntoView({
			// Scroll to that exact node
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		})
	}

	/*
    - Initializes or returns the itemsRef map. Since we're returning a map or object, 
        we're returning the reference. So any changes made to the reference will affect hte itemsRef.current

    1. If it doesn't exist we create a new map. 
    */
	function getMap() {
		if (!itemsRef.current) {
			itemsRef.current = new Map()
		}
		return itemsRef.current
	}

	return (
		<>
			<nav>
				<button onClick={() => scrollToID(0)}>Tom</button>
				<button onClick={() => scrollToID(3)}>John</button>
				<button onClick={() => scrollToID(5)}>Jim</button>
			</nav>
			<div>
				<ul>
					{catList.map((catObj) => {
						;<li
							key={catObj.id}
							/*
                            - Ref callback: Instead of passing the ref, pass a function.
                                So if node exists, (if it's on dom), we record it in the map, else 
                                we actually delete the key-value pair with the id.

                            - Inside here, since map is a reference, we get to manipulate 
                                our ref directly. If ref exists, meaning node is on DOM, we 
                                set it in the map.

                            - When DOM node is removed, React will know the catObj.id of the node being removed and
                                ref callback is called with node=null, and key-value pair with catObj.id is deleted.
                            */
							ref={(node) => {
								const map = getMap()
								if (node) {
									map.set(catObj.id, node)
								} else {
									map.delete(catObj.id)
								}
							}}
						>
							<img src={catObj.imageUrl} />
						</li>
					})}
				</ul>
			</div>
		</>
	)
}

/*
- Example 3: Using forwardRef api so that one component can access the nodes of another.
    Here, MyForm component will be able to access the <input/> node of the MyInput custom
    component using ref.

    NOTE: When defining a component using forwardRef, it's good practice to provide a display name 
        for hte component for debugging and identifying the component in React Dev Tools.
*/

const MyInput = forwardRef((props, ref) => {
	return <input {...props} ref={ref} />
})
MyInput.displayName = "MyInput"

function MyForm() {
	const inputRef = useRef(null)

	function handleClick() {
		inputRef.current.focus()
	}

	return (
		<>
			<MyInput ref={inputRef} />
			<button onClick={handleClick}>Focus the input</button>
		</>
	)
}

export { Form, CatFriends, MyForm }
