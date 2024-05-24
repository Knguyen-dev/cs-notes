import { Link } from "react-router-dom";

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
  3. if y > 0, go up.
  4. if y < 0, go down.

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



*/
import { motion } from "framer-motion";

const Home = () => {
	return (
		// Simple home page with a link to go to the 'base' page
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				// Wait 1 second after the component renders to start our animation
				delay: 1,

				// Make the entire animation take 3 seconds
				duration: 3,
			}}
			className="home container">
			<h2>Welcome to Pizza Joint</h2>
			<Link to="/base">
				<motion.button
					whileHover={{
						// Make button 1.1 times bigger when hovering over it
						scale: 1.1,

						// Create a shadow on the text
						textShadow: "3px 3px 3px rgb(255,255,255)",

						// Create a shadow on the box itself
						boxShadow: "1px 1px 1px rgb(255,255,255)",
					}}>
					Create Your Pizza
				</motion.button>
			</Link>
		</motion.div>
	);
};

export default Home;
