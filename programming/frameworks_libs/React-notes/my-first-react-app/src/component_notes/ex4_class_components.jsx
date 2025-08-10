/*
+ Class components: React components can be created with classes, not just functions. 
    Creating them with classes was the original way before functions, so they'll be 
    seen in a lot of legacy code.

+ How to create class component:
1. Import 'Component'
2. Have your class component inherit from React's component class.
3. Props are passed into the constructor. By calling super(props), 
    you'll be able to use 'this.' with those props. 


*/

import { useState, Component } from "react"
import PropTypes from "prop-types"

/*
- Example 1: Here we a form-like component using functions how we usually do.
*/
function FunctionInput({ name }) {
	const [todos, setTodos] = useState(["Task1", "Task2"])
	const [inputValue, setInputValue] = useState("")

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setTodos((todos) => [...todos, inputValue])
		setInputValue("")
	}

	return (
		<section>
			<h3>{name}</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="task-entry">Enter a task:</label>
				<input
					type="text"
					value={inputValue}
					id="task-entry"
					onChange={handleInputChange}
				/>
				<button type="submit">Submit</button>
			</form>
			<h4>All the tasks!</h4>
			<ul>
				{todos.map((todo) => (
					<li className="todo-item" key={todo}>
						{todo}
					</li>
				))}
			</ul>
		</section>
	)
}
FunctionInput.propTypes = {
	name: PropTypes.string,
}

/*
- Class component version
1. Props are passed into constructor and we pass them when we call the super constructor. 
    As a result, we can do "this.props.someProp", but remember calling the super constructor 
    is required one way or another in JavaScript.
2. Your usual class methods will be used to handle the component
3. States are initialized in the constructor using a map and all state
    values are put into this map. Reacts gives us 'setState' as our state 
    setter, and to update individual state values, we'd pick and choose 
    what part of the map gets updated.
4. Methods must be first 'binded' with 'this' to be worked with. So
    here define the names of the methods you're going to use.

*/
class ClassInput extends Component {
	constructor(props) {
		super(props)

		// Create map for your state. Later in rendering and your defined methods
		// You'll access state values with "this.state.someStateValue"
		this.state = {
			todos: [],
			inputValue: "",
			editValue: "", // For holding value of the edit field
			count: 0,
			isEdit: false,
			editIndex: 0,
		}

		// Bind methods using: this.someMethod = this.someMethod.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditChange = this.handleEditChange.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	// After binding methods in the constructor, define your methods in class body
	/*
    - In handleInput and handleEditChange we are selectively only changing one state value.
		Note, we aren't setting the state to one value! React is smart and preserves the 
		keys for hte state values we didn't change. 

	- In summary: You don't have to set it to the entire state object when changing some
		attributes. You can simple type in the state key you want to change
	
    */
	handleInputChange(e) {
		this.setState({
			inputValue: e.target.value,
		})
	}

	handleEditChange(e) {
		this.setState({
			editValue: e.target.value,
		})
	}

	/*
    - Add a todo and clear input
    1. To do this, we use state updater form, and 
        use the map given by state updater form to 
        access the todo given my the inputValue state.
    2. Here we clear the state value for inputValue, and we 
        add inputValue to 

	NOTE: In our first conditional branch, we update 
		the state values for todos, editValue, and isEdit. That's normal,
		but in our other branch, we use the state updater version. 
		This is just another way to do it and it made sense since 
		count relied on incrementing the previous version. Of course you
		can just do this.state.count + 1, and set it, but we're just showing you 
		other ways of doing things. 
    */
	handleSubmit(e) {
		e.preventDefault()
		if (this.state.isEdit) {
			let updatedTodos = this.state.todos
			updatedTodos[this.state.editIndex] = this.state.editValue
			this.setState({
				todos: updatedTodos,
				editValue: "",
				isEdit: false,
			})
		} else {
			this.setState((state) => ({
				todos: state.todos.concat(state.inputValue),
				inputValue: "",
				count: state.count + 1,
			}))
		}
	}

	handleDelete(todoIndex) {
		let updatedArr = this.state.todos.slice()
		updatedArr.splice(todoIndex, 1) // remember splice changes it in-place so we want to get a shallow copy first.
		this.setState((state) => ({
			todos: updatedArr,
			count: state.count - 1,
		}))
	}

	// Turns on editing mode so that different markup can appear for that todo
	handleEdit(todoIndex) {
		this.setState(() => ({
			isEdit: true,
			editIndex: todoIndex,
			editValue: this.state.todos[todoIndex],
		}))
	}

	// Rendering section, which renders markup and other things render();
	render() {
		return (
			<section>
				<h3>{this.props.name}</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="task-entry">Enter a task: </label>
					<input
						type="text"
						value={this.state.inputValue}
						onChange={this.handleInputChange}
						id="task-entry"
						required
						data-testid="add-todo-input"
					/>
					<button type="submit" data-testid="add-todo-btn">
						Submit
					</button>
				</form>
				<h4 data-testid="todo-count-heading">
					All the tasks! Current Count: {this.state.count}
				</h4>
				<ul>
					{this.state.todos.map((todo, index) => {
						if (this.state.isEdit && index === this.state.editIndex) {
							return (
								<form key={index} onSubmit={this.handleSubmit}>
									<label htmlFor="edit-entry">Edit todo: </label>
									<input
										type="text"
										value={this.state.editValue}
										id="edit-entry"
										onChange={this.handleEditChange}
										required
									/>
									<button type="submit">Submit</button>
								</form>
							)
						} else {
							return (
								<li className="todo-item" key={index}>
									<h3 className="todo-title">{todo}</h3>
									<div>
										<button
											data-testid="todo-edit-btn"
											onClick={() => this.handleEdit(index)}
										>
											Edit
										</button>
										<button onClick={() => this.handleDelete(index)}>
											Delete
										</button>
									</div>
								</li>
							)
						}
					})}
				</ul>
			</section>
		)
	}
}
ClassInput.propTypes = {
	name: PropTypes.string,
}

export { FunctionInput, ClassInput }
