/*
+ Testing Callbacks or handlers: 
- We don't know what onClick does, but we know 
    it just has to be called on button click. Let's
    mock this function.

+ Mocking Child Components: Also called mocking modules, 
    we may mock child components when your component tree gets 
    really big and tests become complex.

+ Arrange Act Assert: A pattern for organizing tests.
1. Arrange: Get all variables and necessary preconditions
2. Act on the thing you're testing.
3. Verify or assert the results of the tests




*/

import PropTypes from "prop-types"
const CustomButton = ({ onClick }) => {
	return <button onClick={onClick}>Click Me</button>
}
CustomButton.propTypes = {
	onClick: PropTypes.func,
}
export { CustomButton }
