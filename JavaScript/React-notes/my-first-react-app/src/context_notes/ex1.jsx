/* eslint-disable no-unused-vars */
/*
+ React Context: A way to manage state globally. It can be used together with the useState hook
  to share state between deeply nested components more easily than with just useState alone.


- The issue/situation: Given that we have many nested components, a state is very high up
  the tree. And to get that state value down the tree, it is passed as props, through
  one or many layers of components so that a component at the bottom of the stack could
  use it. This is 'prop-drilling' and the problem is that the components in-between 
  didn't need the state, but just needed to pass it on. This can create complex code
  but the solution is creating 'context'.

+ How to create context:
1. UserContext = createContext(); initialize it 
2. Then we use a context provider, which will wrap certain child components 
  and supply the state value to those child components.
3. Then to use the context in a child component, access it with "useContext" hook


+ Credit: https://www.w3schools.com/react/react_usecontext.asp#:~:text=React%20Context%20is%20a%20way,easily%20than%20with%20useState%20alone.

*/

import { useState, createContext, useContext } from "react"

/*
- Ex1.

1. Context is created with no default value.
2. In Component1 we use .Provider on our context variable. Now the 
  children nwrapped inside the provider are allowed to access the context and 
  its value, which is the value the context is being used to pass down. In this
  case the name of a user.
3. All Components below Component2 are able to access the context. So 
  on Component3, we actually access the context with useContext

*/

const UserContext = createContext()

function Component1() {
	const [user, setUser] = useState("Jesse Hall")
	return (
		<UserContext.Provider value={user}>
			<h1>Hello {user}!</h1>
			<Component2 user={user} />
		</UserContext.Provider>
	)
}

function Component2() {
	return (
		<>
			<h1>Component 2</h1>
			<Component3 />
		</>
	)
}

function Component3() {
	const user = useContext(UserContext)
	return (
		<>
			<h1>Component 3</h1>
			<h2>Hello again, {user}</h2>
		</>
	)
}

export default Component1
