/*
+ More concepts and techniques on how to use states:


+ How to structure a state:
    1. Generally don't create a state out of a value that can be calculated using existing values,
        states, and or props.
    2. Don't mutate or reassign the state variable directly, always use your 
        state setter function instead.

+ How states are updated: 
1. State updates are asynchronous. When setState is called and updates the state,
    the change will be applied in the next render, or the next time the component is recreated.
2. Of course calling setState calls a re-render, but just keep this in mind.

+ Rendering as a snapshot in time: When your component is rendered, its props, event handlers, and local variables
    were all calculated using its state at the time of render. However note that "A state's variable values don't change within
    a render (event handler)". Meaning if your function calls the setter function and then references the state, it will 
    use the current render's state value, rather than the new one you just scheduled.

+ State updater functions: Usually when using setState, it replaces the current state with the value you want. But 
    there are sometimes you want ot update the state multiple times using the latest state. Using an updater isn't always 
    necessary, but sometimes it can come in handy.
    
    - NOTE: When a callback function is passed to setState, it ensures the latest state is passed in as an argument to the callback. 


- credits: 
    1. https://www.theodinproject.com/lessons/node-path-react-new-more-on-state

*/

import { useState } from "react"

/*
- Example 1: How to mutate a state correctly

1. Our state here is an object, so it's a little more complicated, but it's still light work.
    Using spread operator (...) we just copy all of the old key-value pairs into the new object. 
2. Then putting "age: person.age + 1", will update the value of the 'age' key.
3. As a result we have everything the same as the old object and the age is incremented.

NOTE 'State as a snapshot': 
    - Here's the console.log order when a state setter is called
    1. setPerson before: Unchanged person
    2. setPerson after: Unchanged
    3. setPerson during render: Changes applied; Basically the handler is ran, 
        and uses the state of the current render. Then after the component is re-rendered with new state.
        Essentially, state is same throughout current render. "React keeps state values fixed within a render's event handlers"
        so you don't need to worry about it changing in the handler.
*/
function Person() {
	const [person, setPerson] = useState({
		name: "John",
		age: 24,
	})

	// Good: Correct mutation
	const handleIncreaseAge = () => {
		const newPerson = {
			...person,
			age: person.age + 1,
		}

		console.log("in handleIncreaseAge (before setPerson call): ", person)
		setPerson(newPerson)
		console.log("in handleIncreaseAge (before setPerson call): ", person)

		// Here person.age will still equal = 24, as the state change hasn't been applied yet
		// remember the change will only happen when the componnet is re-rendered by React!
	}

	// Bad: This doesn't work! We aren't allowed to reassign the state variable directly like this!
	// const handleIncreaseAge = () => {
	//     person.age = person.age + 1
	//     setPerson(person)
	// }

	/*
    - Example 2: Rather than increasing the age by 2, this says "replace current render's person with an increase in age 
        by 1. Ok then replace the current render's person with an increase in age by 1". They're calling the setter 
        on the same person. The re-render will happen later, and basically React ensures it'll take the most 
        recent state setter command that was called.
    */
	// const redundantIncreaseAge = () => {
	// 	setPerson({ ...person, age: person.age + 1 })
	// 	setPerson({ ...person, age: person.age + 1 })
	// }

	console.log("During render, ", person)
	return (
		<>
			<h1>{person.name}</h1>
			<h2>{person.age}</h2>
			<button onClick={handleIncreaseAge}>Increase Age</button>
		</>
	)
}

/*
- Example 3 (State as a snapshot): 'num' state only increase once per click. State only changes for the next render. 
    "React prepares to increase num by 1" three times. You're basically setting the state = 1, three times, which 
    is why in the next render it only increases by 1 rather than 3.

*/
function Counter() {
	const [num, setNum] = useState(0)

	/*
    - Example 4: Using state updater function to work with the latest state value, and not the current value.
        By doing this, we bypass the rule that "A state variable's value doesn't change within a render or event handler". 
    
        1. Since we pass in a callback function to setState, React automatically makes the argument (prevNum), the value of the 
        latest and most recent state.
		2. State updater is called three times, but it isn't rendered three times, if it was we would have noticed that it flickered
		three times and it would have looked weird. React does 'batch rendering' as in this case, if a state updater is called multiple 
		times in an execution context, like a function here, it will re-render the result of those state updaters all in one go, so 
		our counter component only re-renders once when increaseByThree is called.    

    
    */
	// const increaseByThree = () => {
	// 	setNum((prevNum) => prevNum + 1)
	// 	setNum((prevNum) => prevNum + 1)
	// 	setNum((prevNum) => prevNum + 1)
	// }

	return (
		<>
			<h1>{num}</h1>
			<button
				onClick={() => {
					setNum(num + 1)
					setNum(num + 1)
					setNum(num + 1)
				}}
				/*
                - Example 5: On the second event listener, it'll show the state of 'num' before the change.
                    Of course, the Counter component could have probably rendered within 3 seconds, but 
                    remember "A state variable's value doesn't change within a render or event handler."
                */
				// onClick={() => {
				// 	setNum(num + 1)
				// 	setTimeout(() => {
				// 		console.log(num)
				// 	}, 3000)
				// }}
			>
				Increase 3?
			</button>
		</>
	)
}

export { Person, Counter }
