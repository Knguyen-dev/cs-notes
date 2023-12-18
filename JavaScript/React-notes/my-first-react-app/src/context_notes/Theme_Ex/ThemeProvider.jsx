/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/*
+ Improving Our Use of Context: 

- Before: We have our ThemeContext it's supplying a booelan
  value to indicate the theme of the application. As well
  as this we have a simple function that toggles that booelan
  state in our App component. However we can simplify this
  by extracting all of that out of the App component, and 
  into a custom hook.


1. Create ThemeProvider component that will wrap around child elements that 
  we will supply your context values to. Extract all logic for managing themes into this component.
2. Use 'children' prop since it's going to act like a context provider
  by wrapping around other components, and supplying them with context values.
3. Create ThemeContext, our context, and we'll return its provider.
4. Create another context, ThemeUpdateContext which will supply the toggle function.
  Then nest the children in both of them so that all children are supplied both values.
5. Since we aren't using 'ThemeContext' or context directly, values supplied aren't 
  accessible with 'useContext' as you can't pass in 'ThemeProvider' to useContext.
5. Create custom hooks, or functions that return the values supplied by our 
  context variables. Then export those custom hooks to components that need to 
  access the values supplied by our contexts.
6. Now wrap ThemeProvider around any markup, and those elements plus their descendants should
  be able to access our context values through the help of our custom hooks.

+ Summary and takeaway
1. Typically when using context api, you can either create your own provider like 
  we did here, or just interact with context directly. The only reason we wanted to 
  create our own provider was mainly because the value we were supplying was a state
  and we had a function that messed with that state. We wanted to extract and isolate 
  that into its own component.
2. This pattern for creating your own context provider is pretty boilerplate and 
  straight-forward:
  - Create context variables, and then custom hooks to return their supplied values
  - Create custom context provider component that wraps around child elements.
  - Define any states, functions, and values that you want to supply. Then
    in your return statement, supply your assign the values that are going 
    to be supplied to the context providers.
  - Wrap your target elements with your custom context provider, and now 
    they should be able to use those custom hooks and export run them to get
    the supplied values. In our case, we supplied a state and its toggler function through
    contexts. 
*/

import { useState, useContext, createContext } from "react"

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export function useTheme() {
	return useContext(ThemeContext)
}

export function useThemeUpdate() {
	return useContext(ThemeUpdateContext)
}

export default function ThemeProvider({ children }) {
	const [darkTheme, setDarkTheme] = useState(true)
	const toggleTheme = () => setDarkTheme(!darkTheme)

	return (
		<ThemeContext.Provider value={darkTheme}>
			<ThemeUpdateContext.Provider value={toggleTheme}>
				{children}
			</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	)
}
