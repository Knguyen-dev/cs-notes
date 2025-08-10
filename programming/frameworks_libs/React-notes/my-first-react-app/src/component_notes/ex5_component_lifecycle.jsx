/*
+ Class Components (Component Lifecycle Methods) Part 2: 
A: A component lifecycle is mounting, updating and unmounting. Class components
    have methods assigned to each one of these steps.


- Component Life Cycle Methods:

1. render(): The most used lifecycle method, and its required. This 
    runs on mount and update. The rendering of any react component should be pure,
    which means it shouldn't modify component data such as states, and not 
    modify any variables outside its scope. The idea of a pure component here.

2. componentDidMount(): Run after component is committed to the DOM. Here we 
    can do things such as fetching data, or anything that involves interacting
    with your already committed DOM elements.

3. componentDidUpdate(): Method is run Run after re-every re-render. Here
    we update anything that should be changed in resopnse to changes in state or 
    DOM changing.

    NOTE: Of course, we'd need to be able when updating states and causing 
    re-renders. To avoid an endless loop, use conditions about previous and current
    prop values when updating states. As a result, this method is similar to having



4. componentWillUnmount(): Runs before a component unmounts and is destroyed.
    Here we perform cleanup actions such as canceling network requests, clearing
    timers, etc.



- How useEffect combines most lifecycle methods:
A: You'd notice that the last 3 methods are similar to how 
    use effect works. useEffect is a combination of those last 3, 

    1. componentDidMount: Equivalent to an empty dependency array as we'd run it only once.
    2. componentDidMount & componentDidUpdate: Equivalent to having a dependency array, so like
        the former would run on initial render, and the latter would run whenever our dependencies
        change. 
    3. componentDidMount & componentDidUpdate: However, if we put no conditions about prev/current props when
        updating states, it's like having no dependency array so componentDidUpdate runs everytime.
    4. componentWillUnmount: Similar to return or cleanup function in useEffect

    NOTE: Remember you won't call these methods directly as react will call them.
        Remember, the three of the last ones at just the precursor to useEffect, so
        treat them like that.

- For example, useEffect has componentDidMount because the effect is going to
    run on the initial render. It also has the componentWillUnmount aspect because 
    it runs some code before the dismounting of the component (clean up function).
    Since dependency array is empty, effects runs only once and not during re-renders, 
    so it doesn't have the 'componentDidUpdate' aspect.


useEffect(() => {
	printHi()

	return () => cleanupFunction()
}, [])
*/

import { Component } from "react"

class LifeCycle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
			updateCounter: 0,
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ data: "Fecthing data after mount" })
		}, 2000)
	}

	/*
    - Remember this will run when it re-renders, so to control this, we should 
        compare the previous states or props to the current ones. Sometimes 
        doing a network request isn't necessary if the props or state hasn't changed.

    NOTE: 
    1. As a result, this only runs its stuff when the state updateCounter has 
        changed. Akin to how a dependency array having the state 'updateCounter'
        to make sure an effect only runs when updateCounter state value changes.
    2. First parameter will always be the previous prop values whilst the second 
        one will be the previous state values.

    */
	componentDidUpdate(prevProps, prevState) {
		if (prevState.updateCounter !== this.state.updateCounter) {
			console.log("Component Updated")
		}
	}

	componentWillUnmount() {
		console.log("Component will unmount. Currently cleaning up")
	}

	updateComponent = () => {
		this.setState((prevState) => ({
			updateCounter: prevState.updateCounter + 1,
		}))
	}
}

export default LifeCycle
