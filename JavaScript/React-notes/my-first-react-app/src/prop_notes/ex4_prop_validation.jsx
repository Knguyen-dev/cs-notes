/*
- We want 'age' to be a number, so we'll use PropTypes, which will tell us when we've passed in an incorrect 
    datatype for a property. 

- How to use PropTypes:
    1. import PropTypes
    2. Define a .propTypes object for the component you want to use propTypes on. We've 
    defined that the name property should be a string while the age property should be a number

    3. By default props are optional, so if a prop should be required for a component to be made, 
    add .isRequired so that the console will warn you when you didn't pass a property to a component where 
    certain properties were required for that component to work.


- Example 1: Here we just define simple data-types for ComponentA to accept

- Example 2: By using PropTypes.node we can test if a component can be rendered in react. This checks for a react node, or 
    something that can be typically rendered/displayed on screen. So if we did <ComponentB renderable={"some string"} /> we don't 
    get errors and 'some string' is rendered onto the screen. However, if we do <ComponentB renderable={{key1: "value1"}} /> and
     pass something like a javascript object to be rendered, we will get an error. 


- Example 3: Using .element  makes sure that the property someComp is going to be another component. By doing 
    something like '{children: PropTypes.element.isRequired}' we make it clear that Example3 component will only have 1 child, which 
    can be useful.

- Example 4: Using oneOfType to get either datatype A or datatype B, etc. Here we ensure that myProperty is 
    going to be either a string or a number

- Example 5: Using oneOf to get either value A or B, etc. Here we made sure that the value of myProperty was 
    either going to be the string 'Loading' or 'Ready'.

- Example 6: Using arrayOf to check that a component is being passed an array of some datatype. Here we made sure 
    the 'arr' property is going to be an array of numbers.


- Example 7 (one of the more important ones): You can use shape and exact to define the details of the object the component will receive.

    1. .shape(object): We defined that person will be an object, but it needs to have a name (string) and age (number). As long as these 2 
        properties of that person object are satisfied, then it's good. The person object doesn't have to exactly only have those two
        attributes, meaning it could have more attributes, but it needs to satisfy those two attributes.

    2. .exact(object): Doing exact will make sure the person object supplied will match the structure defined exactly. In this case 
        it will need to only have those two attributes and match their types as well.
*/

import PropTypes from "prop-types"

function Example1({ name, age }) {
	return (
		<h1>
			In 5 years {name} will be {age + 5}
		</h1>
	)
}

Example1.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number.isRequired,
}

function Example2({ renderable }) {
	return renderable
}

Example2.propTypes = {
	renderable: PropTypes.node,
}

function Example3({ someComp }) {
	return someComp
}

Example3.propTypes = {
	someComp: PropTypes.element,
}

function Example4({ myProperty }) {
	return myProperty
}

Example4.propTypes = {
	myProperty: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
}

function Example5({ myProperty }) {
	return myProperty
}

Example5.propTypes = {
	myProperty: PropTypes.oneOf(["Loading", "Ready"]),
}

function Example6({ arr }) {
	return arr
}

Example6.propTypes = {
	arr: PropTypes.arrayOf(PropTypes.number),
}

function Example7({ person }) {
	return (
		<h1>
			{person.name} is currently {person.age}
		</h1>
	)
}

Example7.propTypes = {
	person: PropTypes.shape({
		name: PropTypes.string,
		age: PropTypes.number,
	}),
}

function App() {
	return <Example6 arr={[1, 2, 3]} />
}

export default App
