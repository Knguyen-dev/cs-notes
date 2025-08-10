/*
Rule 2: CLose all tags.

- In HTML are self closing, e.g. <self closing tag/> where you only have to put a '/' at the end or they're self-wrapping 
    where it's like <self-wrapping tag></self-wrapping tag>. The same rules apply here, close all of your html tags
*/

function App() {
	return (
		<>
			<input />
			<li></li>
		</>
	)
}

// Incorrect because we aren't closi closing tags
// function App() {
// 	return (
// 		<>
// 			<input>
// 			<li>
// 		</>
// 	)
// }

export default App
