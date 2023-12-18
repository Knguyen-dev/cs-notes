/*
+ Here's an example of how to use context in a class component
1. First we import our Theme context that we created in another file.
  Remember to be able to access this, be sure our component 
  is wrapped in the corresponding context provider.
2. Then for class components, do ContextName.Consumer to 'consume' or use the value
  supplied by the context provider. Here we call a function to render the markup with
  the argument being the value passed by ThemeContext.
3. Accessing of value is usually done in the render function 
	for class	components.
*/
import { Component } from "react"
import { ThemeContext } from "./app"
export default class ClassContextComponent extends Component {
	/*
  - Method that returns css styles in an object depending on theme

  NOTE: We aren't manually binding this function because it's not being used
    as a callback function. If this was used as a callback in an eventhandler
    such as onClick, etc.
  */
	themeStyles(darkTheme) {
		return {
			backgroundColor: darkTheme ? "#333" : "#CCC",
			color: darkTheme ? "#CCC" : "#333",
			padding: "2rem",
			margin: "2rem",
		}
	}

	render() {
		return (
			<ThemeContext.Consumer>
				{(darkTheme) => (
					<div style={this.themeStyles(darkTheme)}>Class Theme</div>
				)}
			</ThemeContext.Consumer>
		)
	}
}
