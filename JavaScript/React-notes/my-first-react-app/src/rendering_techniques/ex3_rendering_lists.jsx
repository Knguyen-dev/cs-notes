/*
+ Maybe we want to render a list of components. We JavaScript's can map() and filter() for this. As well
	as this you should keep in mind JSX's special property relating to arrays.

- JSX's Special Property: JSX has the ability to automatically render arrays. JSX gets all of the elements of the array
    and treats it as text inside the curly braces or component really. You'll see more of this on example 4 though. Think
	of it as when you place an array in, the contents of that array are extracted and put in its place.


- Starting code: Let's start off simpel. Acceptable, but want to do this iteratively.
function App() {
  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        <li>Lion</li>
        <li>Cow</li>
        <li>Snake</li>
        <li>Lizard</li>
      </ul>
    </div>
  );
}

1. map(): Here we'd use it more returning an array of jsx elements. You're always going to need to add key property when
	calling map().
2. filter(): Filter out data based on some conditions, before we pass it to map to turn into makrup

- Here's what we want to render:
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>

- How to render:
1. Move data into array
2. Add a key to each array item 

- Keeping a list items in order with "key": In react each child in a list (ul) element should be a unique 
	"key" property. This "key" would be a string or number that uniquely identifies it among other items in
	its array. Keys tell React which array item each component corresponds to, so that it can match them up later, and this becomes 
	very important if array items are moving around such as insertion, deleting, sorting, etc. It just helps make correct updates 
	to DOM.

- How to make a key?: 
	1. Rather than generating keys on the fly, include keys in your data. 
	2. If you're using a database use the key from the database. If it's locally persisted data, an incrementing counter works. 
	3. You can use packages such as uuid when creating items as well if needed
	- Rules of keys: Keys are UNIQUE and IMMUTABLE.
*/

import PropTypes from "prop-types"
import { Fragment } from "react"
import { people } from "./data.js"
import { getImageUrl } from "./utils.js"

/*
- Example 1: Starting off simple. We use map to return an array of 
	jsx or just list elements. Here it's we use the names of the 
	animals as keys, which is unique and immutable.

	- JSX's special property will render all of the elements in 
	that array, which in turn displays all of those list items. Akin
	to thinking the elemnts of the array are extracted and substituted into the braces.
*/
function Example1() {
	const animals = ["Lion", "Cow", "Snake", "Lizard"]
	return (
		<div>
			<h1>Animals:</h1>
			<ul>
				{animals.map((animal) => {
					return <li key={animal}>{animal}</li>
				})}
			</ul>
		</div>
	)
}

/*
- Example 2: Same thing as Example1, JSX will substitute the array with its contents.
- animalsList is an array of li tags. And when we place it in the curly braces
	JSX automatically replaces it with its elements, so that the elements 
	can be rendered.
 */
function Example2() {
	const animals = ["Lion", "Cow", "Snake", "Lizard"]
	const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>)
	return (
		<div>
			<h1>Animals:</h1>
			<ul>{animalsList}</ul>
		</div>
	)
}

// - Example 3: Here we used map to return an array of jsx.
function Example3() {
	const listItems = people.map((person) => (
		<li key={person.id}>
			<img src={getImageUrl(person)} alt={person.name} />
			<p>
				<b>{person.name}</b>
				{" " + person.profession + " "}
				known for {person.accomplishment}
			</p>
		</li>
	))
	return <ul>{listItems}</ul>
}

/*
- Example 4: Sometimes we want to render several DOM nodes per array item. We can use jsx fragments so that our nodes 
	aren't wrapped into one thing, so for each 'person', we rendered an h1 and h2 tag. By using a fragment, we can follow the rule 
	of returning a single root element, and also we can render multiple things since a fragment isn't going to be rendered on the screen.s
*/
function Example4() {
	const listItems = people.map((person) => (
		<Fragment key={person.id}>
			<h1>{person.name}</h1>
			<h1>{person.bio}</h1>
		</Fragment>
	))
	return <ul>{listItems}</ul>
}

/*
- Example 5: Here's also an of rendering components as in the previous ones
	we just did all of the markup creation in one component. 

- Here when we're making ListItem components in map, we're 
	defining the 'key' for React to keep track of it, but also
	we're passing/defining the props for the component.
*/

function ListItem(props) {
	return <li>{props.animal}</li>
}
ListItem.propTypes = {
	animal: PropTypes.string,
}

function List({ animals }) {
	return (
		<ul>
			{animals.map((animal) => {
				return <ListItem key={animal} animal={animal} />
			})}
		</ul>
	)
}
List.propTypes = {
	animals: PropTypes.arrayOf(PropTypes.string),
}

export { Example1, Example2, Example3, Example4, List }
