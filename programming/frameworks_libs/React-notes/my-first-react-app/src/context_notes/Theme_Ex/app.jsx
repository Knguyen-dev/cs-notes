/*
+ How to use context
1. Create a context, a value we are going to supply.
  So for ThemeContext, we start out with no value right now.
2. Export it since we're probably going to use it for 
  different components in different files.
3. Create a context provider, and then define 
  the value you want to supply other components with. 
  Here we want the context provider to give other components 
  a state value.
4. For any component wrapped in the context provider, that 
  component and its descendants will be able to access the 
  value given by the context provider. As a result, there's no need
  to pass down the state value as a prop.
*/

import FunctionContextComponent from "./FunctionContextComponent"

import ThemeProvider from "./ThemeProvider"

export default function App() {
	return (
		<>
			<ThemeProvider>
				<FunctionContextComponent />
			</ThemeProvider>
		</>
	)
}
