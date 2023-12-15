import { useState, useEffect } from "react"

/*
- Testing with effects
- App: Sets a count, increments it once after
    first render. The component just returns the count.
    We know that we'll see 1 since the effect runs 
    immediately. 
*/
function Act_1() {
	let [count, setCount] = useState(0)
	useEffect(() => {
		setCount(1)
	}, [])
	return count
}

/*
- Let's test events this time using the act api. Just a button that 
    increments a counter. Simple!
*/
function Act_2() {
	let [count, setCount] = useState(0)
	return (
		<button onClick={() => setCount((prevCount) => prevCount + 1)}>
			{count}
		</button>
	)
}

/*
- Testing timers: Increase the count one second after 
    initial render.
*/
function Act_3() {
	const [count, setCount] = useState(0)
	useEffect(() => {
		setTimeout(() => setCount((count) => count + 1), 1000)
	}, [])
	return count
}

/*
- Let's test with async and await and fetching data
1. After initial render, run an effect that fetches data (asynchronous task)
*/

export { Act_1, Act_2, Act_3 }

// Credits/Docs: https://github.com/mrdulin/react-act-examples/blob/master/sync.md
