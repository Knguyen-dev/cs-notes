/*
Lesson 1:

Rule 1: Always return a single root element. 

- If you're going to return multiple elements in your component, always wrap them in a parent tag.
    It could be a div or even a 'React fragment' which is '<>Some Child Element</>'. You just always 
    have to return a single element for the component in React.

NOTE: React Fragment is just syntax that lets you group elements together without an extra wrapper node
*/

function App() {
	return (
		<>
			<h1>Example h1</h1>
			<h2>Exmaple h2</h2>
		</>
		// Could replace <></> with <div></div>
	)
}

// Incorrect because it's returning multiple elements for the component
// function App() {
//   return (
//       <h1>Example h1</h1>
//       <h2>Example h2</h2>
//   );
// }

export default App
