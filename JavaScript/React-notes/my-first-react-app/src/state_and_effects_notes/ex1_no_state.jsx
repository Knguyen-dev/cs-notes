/*

+ Here is an example of our image gallery component, but we only use regular variables instead of states and as a result 
    increasing the index doesn't update the image

- Local variables vs States: 
1. Local variables don't persist between renders. When React renders this component, it renders it from scratch, 
    and it doesn't take into account any chnages to local variables. 
2. Changes to local variables won't trigger renders as React doesn't realize it needs to render a component again with new data.

- How to update a component with new data:
1. Retain the data between the renders, so keep track of past data.
2. Trigger React to render the component with new data (re-rendering).

- States are able to satisfy both of these conditions as the sttae variable 
    retains data between renders, and calling the state setter triggers react 
    to render the component again.
*/

import { sculptureList } from "./data.js"
export default function Gallery() {
	let index = 0

	function handleClick() {
		index = index + 1
	}

	let sculpture = sculptureList[index]
	return (
		<>
			<button onClick={handleClick}>Next</button>
			<h2>
				<i>{sculpture.name} </i>
				by {sculpture.artist}
			</h2>
			<h3>
				({index + 1} of {sculptureList.length})
			</h3>
			<img src={sculpture.url} alt={sculpture.alt} />
			<p>{sculpture.description}</p>
		</>
	)
}
