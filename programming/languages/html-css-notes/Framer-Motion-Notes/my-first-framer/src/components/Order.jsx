/* eslint-disable react/prop-types */

/*
 
1. Wrap our AnimatePresence around the thing that's being unmounted
from the DOM, wrap it around the conditional, allowing it to know when 
it's mouned or not.
This allows us to add the 'exit' attribute to the thing 
we're trying to animate out

2. We need to add an 'exit' attribute to the motion.h2
	So it's already on the page, so exit will do the animation needed
	to take it off the page. So this is similar to 'initial' and 'animate
			
<AnimatePresence>
	{
		showTitle && (
			<motion.h2
				exit={{
					opacity: 0
				}}
			>Thank you for your order :)</motion.h2>
		)
	}
</AnimatePresence>
			
				

- Parent motion passes down initial and animate value, so we can
	simply define the variants on the children. Our children
			
- ISSUE: At first glance you'll see our paragraph tag didn't really 
	fade in. Well actually it did fade in, but outside of the screen.
	It's quick, but the opacity animation is done offscreen whilst we're sliding in.
	So how do we fix this? How do we time the parent animation right, so that the child
	animation can be seen as well? Well we could add a delay to the child's animation
	but a better solution would be taking advantage of 'transition orchestration properties'
	in our variants
			
<motion.p variants={ childVariants}>
	You ordered a {pizza.base} pizza with:
</motion.p>
<motion.div variants={ childVariants}>
	{pizza.toppings.map((topping) => (
		<div key={topping}>{topping}</div>
	))}
</motion.div>
			


*/

import { useEffect } from "react";
import { motion} from "framer-motion";
const containerVariants = {
	hidden: {
		x: "100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",

			/*
			- More spring properties

			1. mass: Higher mass means it moves slower (more force to oscillate though), whilst lower is quicker.
			2. damping:  Strength of force that's making the spring stop. So higher means less oscillations
				whilst lower means more oscillations. Zero, means it'll oscillate indefinitely.
			*/
			mass: 0.4,
			damping: 8,

			/*
			- 'when' is a transition orchestration property. So when this animation should occur, in relation to 
			its child motions. Here we say that the parent motion's animations should be completed, the transition should be completed, 
			before any children motion animations.

			- As a result, this animation will run before any child motion animations. And only after this one's transition is done, that the 
			child motions can start their animations. As a result, our slide in happens first, and then our p tag's animation is played.

			- staggerChildren: Creates a delay between the start of each child's animation within the parent.
				Here, each child's animation will start <staggerChildren> seconds after the previous one's.

			+ Current flow:
			1. Parent container renders and does it's animation
			2. First child's animation will start once the parent is finished.
			3. Second child will start <staggerChildren> seconds after the first one is done. 
			3. If we had a third child, it's animation would start <staggerChildren> seconds after the 2nd child's (previous). And so on.


			*/
			when: "beforeChildren",
			staggerChildren: 0.5,
		},
	},
};

const childVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,  
	}
}



const Order = ({ pizza, setShowModal }) => {

	
	useEffect(() => {
		// After 5 seconds, show the modal
		const timer = setTimeout(() => {
			setShowModal(true);
		}, 2000)


		return () => clearTimeout(timer);
	}, [setShowModal])


	
	return (
		<motion.div className="container order"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<h2>Thank you for your order :)</h2>
			<motion.p variants={childVariants}>You ordered a {pizza.base} pizza with:</motion.p>
			<motion.div variants={childVariants}>
			{pizza.toppings.map(topping => <div key={topping} >{topping}</div>)}
			</motion.div>    
		</motion.div>
			
			
			


	);
};

export default Order;
