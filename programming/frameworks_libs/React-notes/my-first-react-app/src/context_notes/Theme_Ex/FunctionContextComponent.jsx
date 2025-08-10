/*
+ Here's an example of how to use context in a functional component:
1. Do 'useContext(YourContext)' to extract the value supplied by
  your context provider. Now we have the state value
  for the theme of the app, that was passed through context.


+ Using custom theme provider:
1. Use the custom hooks, which deliver the state and 
  the toggling function.
2. Now we're able to toggle and render the theme of the 
  app through the 'FunctionalContextComponent'

  */

import { useTheme, useThemeUpdate } from "./ThemeProvider"

export default function FunctionContextComponent() {
	const darkTheme = useTheme()
	const toggleTheme = useThemeUpdate()

	const themeStyles = {
		backgroundColor: darkTheme ? "#333" : "#CCC",
		color: darkTheme ? "#CCC" : "#333",
		padding: "2rem",
		margin: "2rem",
	}

	return (
		<div style={themeStyles}>
			<button onClick={toggleTheme}>Toggle Theme</button>
			<div style={themeStyles}>Function Theme</div>
		</div>
	)
}
