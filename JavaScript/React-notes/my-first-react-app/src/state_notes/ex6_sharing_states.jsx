/* eslint-disable react/prop-types */
/*
- Credits: https://react.dev/learn/sharing-state-between-components
+ Sharing states between components: Somtimes you want the state of two components 
    to always change together. We'll use a common technique called 'lifting state up'
    
    Lifting state up: We let the their common parent have a state, rather than the individuals. Then
    we can pass down data using props, which will change both of them.  


Our example: A parent Accordion component renders two separate Panel child components.
    Each Panel has a boolean 'isActive' to determine whether it's going to display its content or not.


Example 1: Here panels are independent, as pressing one will not affect the other. This is where
    all panels have their own individual state variables, which is different from our 'lifting state up' 
    approach. This is shown in the "no_sharing" file


Example 2: How about we make it so only one panel is open at any time. So if you open one, all others close. To 
    coordinate these multiple components we "lift their state up" to a parent component

+ How to lift state up:
    1.  Remove state from child components
    2. Pass hardcoded data from the common parent
    3. Add state to command parent and the value down to the children with event handlers.

*/

import { useState } from "react"

/*

1. Remove "const [isActive, setIsActive] = useState(false)" from Panel functional component.
     Add "isActive" as one of Panel's props
2. We make Accordion pass a value for "isActive" to the children components. Since 
    Accordion is the parent of both, it will become the "source of truth" for these 
    Panel components.
3. Let Accordion have a state 'activeIndex' to represent the index of the panel that should be active.
    And it'll pass this to the Panel components. Clicking the 'show' button in the panels should 
    change the 'activeIndex' state of the parent. Can't be done directly since it's a state 
    in another component, so we'll pass a function (eventhandler) as a prop (setActiveIndex).

As a review: We calculate isActive for each Panel in the parent. As well as this we pass a event handler to 
    each Panel we instantiate, which set the 'activeIndex' to the respective index of that Panel. 

NOTE: Of course, here the indices are hardcoded, but you can make it dynamic if you're using 
    an array. We'll handle that in "dynamic"

*/
function Panel({ title, children, isActive, onShow }) {
	return (
		<section className="panel">
			<h3>{title}</h3>
			{isActive ? (
				<p>{children}</p>
			) : (
				<button onClick={() => onShow(true)}>Show</button>
			)}
		</section>
	)
}

export default function Accordion() {
	const [activeIndex, setActiveIndex] = useState(0)
	return (
		<>
			<h2>Almaty, Kazahkstan</h2>
			<Panel
				title="About"
				isActive={activeIndex === 0}
				onShow={() => setActiveIndex(0)}
			>
				With a population of about 2 million, Almaty is Kazakhstan&apos;s
				largest city. From 1929 to 1997, it was its capital city.
			</Panel>
			<Panel
				title="Etymology"
				isActive={activeIndex === 1}
				onShow={() => setActiveIndex(1)}
			>
				The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
				&quot;apple&quot; and is often translated as &quot;full of apples&quot;.
				In fact, the region surrounding Almaty is thought to be the ancestral
				home of the apple, and the wild <i lang="la">Malus sieversii</i> is
				considered a likely candidate for the ancestor of the modern domestic
				apple.
			</Panel>
		</>
	)
}
