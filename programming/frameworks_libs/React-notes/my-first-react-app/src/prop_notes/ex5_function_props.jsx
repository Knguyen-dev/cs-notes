/*
- Here's a example of making a Button component. Imagine we had a component that created a button, we'd pass in all of 
the specifications, and the button is created

- Button: Has default arguments for the text, color, and font size of the button. Then handle click is the callback function it's going
    to call when the button is clicked. Remember it's not 'font-size' in jsx, it's 'fontSize' with camelCase. We also 
    make sure the properties being passed are the correct data types.
*/
import PropTypes from "prop-types"
function Button({ text, color, fontSize, handleClick }) {
	const buttonStyle = {
		color: color,
		fontSize: fontSize,
	}
	return (
		<button style={buttonStyle} onClick={handleClick}>
			{text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	fontSize: PropTypes.number,
	handleClick: PropTypes.func,
}

export default Button
