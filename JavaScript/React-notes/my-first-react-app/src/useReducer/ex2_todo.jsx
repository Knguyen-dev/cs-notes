/* eslint-disable react-refresh/only-export-components */
/*
+ Example 2: Using useReducer when creating a todolist
  application, a more complex use cas

1. Our state will be an array, an array of objects that hold
  todos. Then we'll have state for the name of the todo.
  NOTE: We choose state for handling the name of the todo
  because it's just a string, rather than a complex object.


2. Since we need data, the name of the todo in this case, we pass
  a 'payload' object that contains all of the data for our object.
  React will help us out, and allow us to access that payload object
  through the 'action' object. 

3. As a result, we don't need to have multiple different functions
  for handling our complex object's state. Instead we have one dispatch 
  or reducer function that will take in different 'action' and parameters 
  to follow through with those actions.


NOTE: Obviously in your real application, you'd name 'ACTIONS' as 'TODO_ACTIONS' and store it 
  in a file such as 'ACTIONS.js' in case you have many times where you apply useReducer
*/

import { useState, useReducer } from "react"
import Todo from "./Todo"
export const ACTIONS = {
	ADD_TODO: "add-todo",
	TOGGLE_TODO: "toggle-todo",
	DELETE_TODO: "delete-todo",
}

/*
+ Updates our todos.
- todos: Remember this is just the current state value before 
  it gets updated. And our state value is just an array of strings.

1. For adding, we pass in a 'payload' object with the name 
  of our todo. Access that todo daa through the 'action' object, and 
  create a new todo with a helpe function.

2. For toggling, we want to pass in an id that indicates which todo
  is being toggled. Iterate through all todos, if it's the target, return 
  the todo but the boolean is reversed, else just return the original todo since
  it's not our target. This should return a corrected array, and update 
  our state array. Note, in this action 'editing' our payload 
  is completely different as its 'id' not name, indicating 
  different cases can have differnet payloads.

3. Then for deleting, we use filter to return an array of 
  todos that don't have the id of our target todo.

- Takeaway:
1. Since we are handling a complex object as state, well an array of complext
  objects, we could use useReducer. As a result we had a singular function controlling
  the ways the todos were updated in our state array
2. Notice how in this example, we didn't need to create any helper functions for adding, toggling
  or deleting, and we didn't even need to pass the latter two down to 'Todo' component. We just had 
  to pass down 'dispatch' and the rest was done.

3. Essentially, apply useReducer when you have a complex object as a state, for example you have 
  an object that represents multiple fields of form data. It's a state value that's a complex 
  while it's cool to apply useState, it could be more appropriate to apply useReducer as it
  may result in cleaner and simpler code.
*/
function myReducer(todos, action) {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, createNewTodo(action.payload.name)]

		case ACTIONS.TOGGLE_TODO:
			return todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, complete: !todo.complete }
				} else {
					return todo
				}
			})

		case ACTIONS.DELETE_TODO:
			return todos.filter((todo) => {
				return todo.id !== ACTIONS.payload.id
			})

		default:
			return todos
	}
}

// Returns a new todo object with id, name, and completion status
function createNewTodo(name) {
	return { id: Date.now(), name: name, complete: false }
}

export default function App() {
	const [todos, dispatch] = useReducer(myReducer, [])
	const [name, setName] = useState("")

	function handleSubmit(e) {
		e.preventDefault()
		dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
		setName("")
	}

	return (
		<div className="my-app">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</form>

			<ul className="todo-list">
				{todos.map((todo) => (
					<Todo key={todo.id} todo={todo} />
				))}
			</ul>
		</div>
	)
}
