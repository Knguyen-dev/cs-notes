/* eslint-disable react/prop-types */
/*

- When a component re-renders, anything not controlled by React is destroyed and re-executed.
  This includes the local variables and functions, so badHandleClick is recreated each time
  and the onClick prop changes as well. So to make this more efficient, we can
  memoize our functions. 


1. Add useMemo. Okay, but wehn a parent's state changes, the parent will re-render, and its 
  children will re-render. To finish memoization, do 'memo' on the component. Now MyButton will 
  only render when its props or own state changes, so even if its parent is re-rendered, it won't.

+ Scenarios that can happen:
1. Pass badHandleClick to ButtonComponent, still re-renders. This 
  is because the prop 'badHandleClick' is different, it's a local function that 
  was destroyed and recreated when rendering, and so react sees it as a different prop.
2. Pass memoizedHandleClick, it will not re-render since you memoized the function being 
  passed, and ButtonComponent now memoed only re-renders based on different props or its own
  state changed. memoizedHandleClick isn't a different prop, it's the same since it was memoized.

*/

import { useState, useMemo, memo } from "react"

export const ButtonComponent = memo(function ButtonComponent({
	children,
	onClick,
}) {
	let i = 0
	let j = 0
	const ITERATION_COUNT = 10_000
	while (i < ITERATION_COUNT) {
		while (j < ITERATION_COUNT) {
			j += 1
		}
		i += 1
		j = 0
	}

	return (
		<button type="button" onClick={onClick}>
			{children}
		</button>
	)
})
export default function App() {
	const [count, setCount] = useState(0)

	// eslint-disable-next-line no-unused-vars
	const BadHandleClick = () => {
		setCount((prevState) => prevState + 1)
	}

	/*
  - Memoizing a function using useMemo
  1. First arrow functio is useMemo callback
  2. Second array function is the our actual function we want to call.
  */
	const memoizedHandleClick = useMemo(
		() => () => setCount((prevState) => prevState + 1),
		[]
	)

	return (
		<div>
			<h1>{count}</h1>
			<ButtonComponent onClick={memoizedHandleClick}>Click Me</ButtonComponent>
		</div>
	)
}
