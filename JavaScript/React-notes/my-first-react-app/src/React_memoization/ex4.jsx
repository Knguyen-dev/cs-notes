/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/*

+ Preface: We're using a CandyDispenser component for our example. 


+ memoizing vs nothing: useCallback is used to improve performance, but
  sometimes it's just worse. In our two examples, using useCallback does 
  more work as we define a function, array, and call useCallback. JavaScript 
  allocates memory for functions on every render, and useCallback. Without 
  getting too technical, more memory may be allocated when we memoize.

  - Even with useMemo, memoizing initialCandies so that it isn't build everytime
  doesn't really save much memory or improve performance that much. We're making the 
  code more complex, but we're not really benefiting a lot. A better solution would be 
  moving 'initialCandies' out of the react-component so it's just static
  and never gets rebuilt due to re-renders of CandyDispenser.


1. Using use callback
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}
const dispenseCallback = React.useCallback(dispense, [])

2. Not memoizing our function
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}


+ Main Takeaway and points:
1. Optimizations aren't free, and always come with a cost. We just need to determine if 
  our benefits outweigh those costs. 
2. Most of the time don't bother with optimizing unnecessary re-renders as react is very 
  fast and efficient. The need to optimize is very rare for react. Exceptions would have 
  to be things such as interactive Graphs, Charts, etc. Reckless optimizations could 
  lead to just worse performance as you're incurring costs without reaping the benefits 
  you thought you would
3. Only use memoization for computationally expensive calculations. An example could be 
  you're calculating the total or other numbers for a user's shopping cart. It could 
  be pretty expensive as gets more expensive as number of items increase. This would 
  be a great time to utilize useMemo because we never want to do the same calculation
  twice. 


- Credits: https://kentcdodds.com/blog/usememo-and-usecallback#how-is-usememo-different-but-similar
*/

import { useState } from "react"
export default function CandyDispenser() {
	const initialCandies = ["snickers", "skittles", "twix", "milky way"]
	const [candies, setCandies] = useState(initialCandies)
	const dispense = (candy) => {
		setCandies((allCandies) => allCandies.filter((c) => c !== candy))
	}
	return (
		<div>
			<h1>Candy Dispenser</h1>
			<div>
				<div>Available Candy</div>
				{candies.length === 0 ? (
					<button onClick={() => setCandies(initialCandies)}>refill</button>
				) : (
					<ul>
						{candies.map((candy) => (
							<li key={candy}>
								<button onClick={() => dispense(candy)}>grab</button> {candy}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

/*
+ Referential equality: Complex objects are compared with memory addresses rather than value.
1. So this effect won't work as expected as, options object is re-created everytime, a different
  reference everytime, and so javascript compares on references, meaning this effect will run on every render
  rather than only when bar or baz change. This is because we are comparing objects/references, not simple values.

2. To fix this: Have the dependency array rely on the values in the object, assuming these values aren't 
  objects themselves and can be compared with via their values. Now effect will only run when values 
  of bar and baz are different, and we can still use buzz function by passing in an object.
*/
function Foo({ bar, baz }) {
	const options = { bar, baz }
	useEffect(() => {
		buzz(options)
	}, [options]) // we want this to re-run if bar or baz change
	return <div>foobar</div>
}

function GoodFoo({ bar, baz }) {
	useEffect(() => {
		const options = { bar, baz }
		buzz(options)
	}, [bar, baz]) // we want this to re-run if bar or baz change
	return <div>foobar</div>
}
