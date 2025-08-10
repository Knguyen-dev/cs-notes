/*
+ Our counting app with no reducer.
  It's a very normal app in this case.

*/

import { useState } from "react"
export default function App() {
	const [count, setCount] = useState(0)

	const increment = () => setCount((prevCount) => prevCount + 1)
	const decrement = () => setCount((prevCount) => prevCount - 1)

	return (
		<div className="counter">
			<button onClick={decrement}>Subtract</button>
			<span>{count}</span>
			<button onClick={increment}>Add</button>
		</div>
	)
}
