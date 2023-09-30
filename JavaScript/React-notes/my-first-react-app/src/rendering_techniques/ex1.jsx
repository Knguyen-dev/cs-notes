/*
+ Lesson 3:

Previous Lesson: prop_notes


Rendering multiple elements in a component: 

- JSX's Special Property: JSX has the ability to automatically render arrays. JSX adds all of the elements of the array
    as text to the element. This allows us to add more mark up to our html element. 

- Before we begin, when you see the attribute 'key' in the li element, for now just know it let's React know the identity of the element
    in each li tag. When you're dealing with a dynamic list where we're adding/removing elements, we put this in as React must know this information. 
    Since we're dealing with a static list for right now, it doesn't matter


- Starting code: Acceptable, but want to do this iteratively.
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

Example 1: Using map to return an array of li elements, so that expression evaluates to an array. This will do 
    the same thing as the starting code and render the animals due to JSX's special property. This is akin to 
*/

function Example1() {
	const animals = ["Lion", "Cow", "Snake", "Lizard"]
	return (
		<div>
			<h1>Animals: </h1>
			<ul>
				{animals.map((animal) => {
					return <li key={animal}>{animal}</li>
				})}
			</ul>
		</div>
	)
}

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

export { Example1, Example2 }
