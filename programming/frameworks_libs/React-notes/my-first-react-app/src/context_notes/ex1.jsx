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
4. Context accepts one thing 'value', which is the data you're supplying.
	The components wrapped in a context provider will be able to 
	access the context, and also their children, and so on, will be able 
	to do so as well.

+ Before adding context api 
1. It's easy to overuse it, sometimes passing props through a couple layers of components is necessary
  and normal. It's only when you need some props across multiple different levels, or even globally is when
  you want to use contextapi.
2. Don't forget to extra compoennts and use jsx like children. For example Maybe you do <Layout posts={posts}/>
  and so posts is the props you're passing. The solution is <Layout><Posts posts={posts}/></Layout> as we 
  just need to structure our jsx to use children instead!

+ Main Use Cases for Context:
1. Managing Application Themes: Create context provider at the top of the app, and then
  use that to adjust the look for your components.
2. Users and auth: Many components may need to know hte currently logged in user. 
  Putting that in a context makes it easy to read it from anywhere in our component tree.
3. Routing: Most routing solutions use context to hold current route. If you're building
  your own router, this will likely be needed.
4. Managing State: As an app grows, states may move closer ot the top of the app.
  It's common to use a reducer with context to manage complex state and pass it down 
  to distant components.


+ Credits: 
1. Web Dev Simplified: https://www.youtube.com/watch?v=5LrDIWkK_Bc
2. React Context Docs: https://react.dev/learn/passing-data-deeply-with-context
3. W3Schools: https://www.w3schools.com/react/react_usecontext.asp#:~:text=React%20Context%20is%20a%20way,easily%20than%20with%20useState%20alone.
*/

import { useState, createContext, useContext } from "react"

/*
- Ex1.

1. Context is created with no default value.
2. In Component1 we use .Provider on our context variable. Now the 
  children nwrapped inside the provider are allowed to access the context and 
  its value, which is the value the context is being used to pass down. In this
  case the name of a user.
3. Component2 and all of its descendants will be able to access the value
	supplied by use.


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
