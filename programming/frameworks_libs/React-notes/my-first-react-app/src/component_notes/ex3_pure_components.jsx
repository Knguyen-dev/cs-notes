/*

+ Keeping Components Pure: Some functions are pure functions. Pure functions only perform
    a calculation and stop. By writing pure functions, we avoid a lot of terrible bugs and behavior as the codebase grows.

- Pure functions in computer science:
    1. Doesn't change any variables that existed before it was called. It only interacts with variables in its 
        local scope.
    2. Given the same inputs, it will return the same output. For example, if I pass 2 to the double function, I'll
    always be returned 6 as the output.

- React assumes every component you write is a pure one. So given the same inputs, the functional components must 
    return the same JSX. Obviously a tell tale sign of an impure function is when it mutates a variable outside
    it's scope, but an exception to this is a local mutation 
    
    
- Local mutation: When you're changing a variable, however it's isolated inside your component. You're creating 
    and changing the inside the component so it's not going to affect code on the outside, it's still local.


- Side effects: Updating the screen, starting an animation, changing data, these are side effects that happen on the side,
    and not during rendering. They're usually inside event handlers, which will be usually be defined inside your component.
    However, they won't be run during rendering, so they don't need to be pure. You'll get a proper introduction about React's event 
    handlers and side effects in "state_and_effects_notes".

 */

import PropTypes from "prop-tyeps"

// Ex.1: Pure javascript function, given the same input, I'm always returned the same numerical output
// function double(n) {
// 	return 2 * n
// }

// Ex.2: Pure react component, given the same input, I always get the same JSX output
function Greeting({ message }) {
	return <h1>{message}</h1>
}
Greeting.propTypes = {
	message: PropTypes.string,
}

/*
- Ex.3: Impure react component because given the same inputs, it'll return different outputs. A
    tell-tale sign is how it manipulates a variable that's outside of its own scope. A variable that
    existed before its own rendering.

let guest = 0
function Cup() {
    guest += 1
    return <h1>Tea cup for guest #{guest}</h1>
}
 */

/*
- Example 4: Local mutation. When you're rendering a TeaGathering, the cups variable is being modified when
    you're rendering Cup components. This is alright because you created 'cups' inside TeaGathering rather 
    than outside. No code outside of TeaGathering is affected, and so it's a local mutation.
*/

function Cup({ guestNum }) {
	return <h2>Tea cup for guest #{guestNum}</h2>
}
Cup.propTypes = {
	guestNum: PropTypes.num,
}

function TeaGathering() {
	let cups = []
	for (let i = 1; i <= 12; i++) {
		cups.push(<Cup key={i} guest={i} />)
	}
}

export default TeaGathering
