/*
- Let's render a list of components. 

- NOTE: You'll learn about props later, for now props are just arguments that are passed into components. The functions
    accpet 'props', which is an object containing the 'animals' that we defined when we wrote "<List animals={animals}/>". We made a
    key 'animals' that had a value of an array, and through the 'props' object we accessed our values. Of course we could have 
    done <List animalList={animals}/> to make the key 'animalList', but we would have had to do 'props.animalList' to access the array.


*/

// Function Component that creates a list item
function ListItem(props) {
	return <li>{props.animal}</li>
}

// Functional component that creates a list or ul element
function List(props) {
	return (
		<ul>
			{props.animals.map((animal) => {
				return <ListItem key={animal} animal={animal} />
			})}
		</ul>
	)
}

function App() {
	const animals = ["Lion", "Cow", "Snake", "Lizard"]
	return (
		<div>
			<h1>Animals: </h1>
			<List animals={animals} />
		</div>
	)
}

export default App
