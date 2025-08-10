/*

Basics of Framer Motion:

+ motion: Essentially an element that we use to create animation-capable DOM objects. So
  doing <motion.h2></motion.h2> would be a normal h2 tag, but now it would have various 
  animation capabilities! Then we'd add an animate property

+ animate: You'd pass in an object of properties you want to animate. In this case we want fontSize 50, so 
  on load, the h2 tag will be regular, and then it will grow to 50px in a very smooth manner.

+ X and Y positions: You can move elements with the 'x' and 'y' property, which move elements horizontally and vertically respectively.
  1. if x > 0, go right.
  2. if x < 0, go left.
  3. if y < 0, go up.
  4. if y > 0, go down.

  Of course x and y aren't css properties, but they are just 'convenience' properties created by the framer motion library
  to achieve certain functionality.

+ Transition attribute:
How we can decide how the animation transitions from start to end, so from initial to animate.

+ type: The type of animation that we are doing. Default value is spring, which is noticeable because there's some bouncing 
            in our animation.
1. tween: More of an eased transition. Uses 'duration'
2. inertia
3. spring: Has a springy and bouncing effect. With it you can use 'stiffness', which is only available when the transition is type 'spring'

+ Initial attribute:
We've seen animate, which animates something until it ends. However uou can also specify the initial starting point 
of what an element should be or look like when it renders on the screen, before the apply the main animations to it.
So this sets where it animates from, the start point. So from initial to animate, is like from start to end of the animation.

+ Using whileHover to apply animations when hovering over a component:
Use the whileHover attribute to apply animations when hovering on an element. The 
same idea applies, as we just pass in an object of properties.

Intermediate Framer Motion

+ Variants:
1. Allow us to extract the logic of our initial, animate, and transition attributes into variables that we can reference. As a result,
  we can create resuable animations, and also keep our animations separate from our component's main logic. Resulting in cleaner code.
2. Allow us to propagate 'variant' changes through the dom, which would result in cleaner code.
3. Allow us to create relationships between parent and children motions, using 'transition orchestration properties'.

+ Keyframes
Allows us ot havean element transition through several animations.


+ Animating something that's leaving the DOM:
When a component leaves the DOM, it kind of just pops out by default. To 
animate what happens when a component leaves the dom, we will use the AnimatePresence component!
  

+ Animating routes
Using what we've learned previously let's animate our routes. Currently we're 
able to animate when a route comes in. It renders and the animation plays. However the 
previous page just dismounts, with no animation at all. Let's change this with 
AnimatePresence, and create an animation for pages leaving the DOM.

+ Toggling between variant properties:
Utilize the useCycle hook that allows us to cycle through different values. Allowing us to swap through different animations 
and even performing multiple animations based on certain interactions.
So it our loader, we'll be swapping from animationOne to animationTwo, etc.


*/

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./Loader";


const buttonVariants = {
	hover: {
		scale: 1.1,
		textShadow: "3px 3px 3px rgb(255,255,255)",
		boxShadow: "1px 1px 1px rgb(255,255,255)",
		transition: {
			duration: 0.5,
			repeat: Infinity,
			repeatType: "reverse",
		},
	},
};

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delay: 1,
			duration: 3,
		},
	},
	exit: {
		x: "-100vw",
		transition: {
			ease: "easeInOut",
		},
	},
};

const Home = () => {
	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="home container"
		>
			<h2>Welcome to Pizza Joint</h2>
			<Link to="/base">
				<motion.button variants={buttonVariants} whileHover="hover">
					Create Your Pizza
				</motion.button>
			</Link>

			<Loader />
		</motion.div>
	);
};

export default Home;
