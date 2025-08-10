/*
+ Render and Commit: More detailed process on how we can view rendering and the rendering process
    before we move on about states. Before components are displayed on screen, they are rendered by React. 


Analogy: Your components are like cooks in the kitchen, and react's the waiter.

+ How rendering works:
1. Triggering a render (Delivering the guest's order to kitchen so it can be made. This is telling react that 
    a component needs to be created, or rendered which is how we're calling it now).
2. Rendering the component (Preparing the order in the kitchen. When we say rendering in the context of React, we mean 
    actually creating or recreating a component.)
3. Committing to the DOM (Placing the order on the table. This would mean displaying the rendered component on the screen.)



- Triggering a render: Reasons why a component render:
    1. It's the component's initial render. Done with createRoot.
    2. The component or one of its ancestors' state has been updated

- React renders the component: Rendering is when React calls your components
    1. On initial render, React calls the root component. Here Reacts creates the DOM nodes and 
    HTML tags.
    2. On subsequent renders, React calls the functional component that triggered the render 
        due with its state change. Here it'll see which of the properties changed, if any, since previous
        render. Then it acts on that information in the 'commit' phase.

- React commits changes to DOM:
    1. On initial render, React uses appendChild to put all DOM nodes it created on the screen
    2. For re-renders, it uses the information it calculated while rendering to make DOM 
        match the latest rendering output.

    NOTE: React only updates or re-renders the stuff that changes. In this clock
    component, even if the parent is always passing new props to change the h1 tag's new time, 
    it only updates the content of h1 since that's the only thing that's changing or being affected. If no changes 
    are being made to input, then it'll continue changing the h1, but leave the input alone.

- credits: https://react.dev/learn/render-and-commit
*/

// export default function Clock({ time }) {
// 	return (
// 		<>
// 			<h1>{time}</h1>
// 			<input />
// 		</>
// 	)
// }
