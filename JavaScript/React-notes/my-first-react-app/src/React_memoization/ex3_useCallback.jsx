/*
+ useCallback: Specifically used for memoizing functions. Now you won't have to 
  use useMemo


- Memoizing a function with useMemo
1. const handleClick = useMemo(() => () => setCount(prevState) => prevState+1, [])
2. const memoizedHandleClick = useMemo(() => handleClick, [])

- As a result: Remember as a result, our functions aren't recreated on each render. That's 
  the point of memoizing our functions.


*/

import { useState, useCallback } from "react"
export default function App() {
	const [count, setCount] = useState(0)
	const handleClick = useCallback(
		() => setCount((prevState) => prevState + 1),
		[]
	)

	const badHandleClick = () => setCount((prevState) => prevState + 1)

	// Could do this as well
	const memoizedHandleClick = useCallback(badHandleClick, [])

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={memoizedHandleClick}></button>
			<button onClick={handleClick}></button>
		</div>
	)
}
