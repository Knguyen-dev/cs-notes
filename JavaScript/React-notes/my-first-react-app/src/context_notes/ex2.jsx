/*
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

*/
