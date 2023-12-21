/*
+ useReducer: A hook that helps us control more complex states.
  Based on certain concrete actions, it will give us and set a new
  state value.

+ How to use 'useReducer'
1. Plan to create our 'reducer' function, and pass our state value 
  as an object in the form of a key-value pair. This
  is basically equivalent to just a regular state.

  - Here it's similar to 'const [count, setCount] = useState(0)'

  NOTE: You could pass in 0 as a number instead of an object, but 
  typically when using useReducer, we want to control states that are 
  complex objects. So we'll just make our value an object.

2. We are returned 'const [state, dispatch]', where 
  state is our state-value and dispatch is what we call to 
  update our state. In this case we will call 'myReducer' to 
  update our 'count' state.

3. The reducer function 'myReducer' will take the 
  current state and an 'action'. The action is just 
  the argument that's passed when we call our 'dispatch' function.
  Then after, the myReducer function will return a new
  state value and our state should be updated.

  - If this was the reducer, everytime we do dispatch(),
    it would increment the count value in our state object.
    Notice in this example, action is not being used and dispatch
    isn't being passed a value, so the action would be 
    undefined anyways. 
    
  function myReducer(state, action) {
    return {count: state.count + 1}
  }

4. Now let's make it so we can add and subtract the state.
  Now our 'action' should typically be an object, and in there
  we have properties to decide how we update the state.
  Typically, we control the conditional logic with a switch statement.

5. As a result, based on actions.type, 'type' a property we 
  defined, we have successfully made it so that our state
  value can only be changed a limited number of ways.

  NOTE: Recommended that we don't use hard code values
    for hte properties of our actions, meaning don't just 
    insert the strings in there, use something like the 'ACTIONS'
    object for better code.

6. However, useReducer is used for more complex use-cases and 
  shouldn't be used for something like a counter, or a state value that 
  isn't a complext javascript object.

*/

import { useReducer } from "react"

const ACTIONS = {
	INCREMENT: "increment",
	DECREMENT: "decrement",
}

function myReducer(state, action) {
	switch (action.type) {
		case ACTIONS.INCREMENT:
			return { count: state.count + 1 }
		case ACTIONS.DECREMENT:
			return { count: state.count - 1 }
		default:
			return state
	}
}

export default function App() {
	const [state, dispatch] = useReducer(myReducer, { count: 0 })

	function increment() {
		dispatch({ type: ACTIONS.INCREMENT })
	}
	function decrement() {
		dispatch({ type: ACTIONS.DECREMENT })
	}

	return (
		<div className="counter">
			<button onClick={decrement}>Subtract</button>
			<span>{state.count}</span>
			<button onClick={increment}>Add</button>
		</div>
	)
}
