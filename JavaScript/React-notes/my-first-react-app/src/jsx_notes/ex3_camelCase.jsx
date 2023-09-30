/*
Rule 3: camelCase MOST things

- JSX turns into JavaScript, and attributes of elements become keys in JavaScript Objects. This means 
    you can't use dashes or reserved words such as 'class'. As a result many HTML attributes are written in camelCase, so 
    instead of 'stroke-width' use 'strokeWidth', and instead of 'class' use 'className'.

Pitfall: Attributes like aria-* and data-* are written the same as they are in regular html, so keep the dashes
*/

function App() {
	return (
		<>
			<div className="container">
				<svg>
					<circle
						cx="25"
						cy="75"
						r="20"
						stroke="green"
						strokeWidth="2"
					/>
				</svg>
			</div>
		</>
	)
}

// Incorrect
// function App() {
// 	return (
// 		<>
// 			<div class="container">
// 				<svg>
// 					<circle
// 						cx="25"
// 						cy="75"
// 						r="20"
// 						stroke="green"
// 						stroke-width="2"
// 					/>
// 				</svg>
// 			</div>
// 		</>
// 	)
// }

export default App
