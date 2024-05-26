/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/*
- containerVariants: The variants for our container. 
1. 'hidden': Well a variant/state of our 'container' is 'hidden' (just sounds like an appropriate name) because when the page first renders we put it 100vw off to the 
  right side of the screen so that it isn't seen immediately on render. We'll also make opacity 0 as well. Then we wait for our other animation to show it.
2. 'visible': Our visible variant, will then show our page by putting its x to 0 (0 pixels away from natural DOM position), and increase its opacity to normal.
*/
const containerVariants = {
	/*
  The idea is that the Base page component should come from the right side of the screen into the center (where it naturally is)
  1. On render, start off 100vw to the right
  2. End up 0 pixels away from where it naturally should be
  3. Wait about 0.5 seconds after rendering befoer starting this sliding animation.
  */
	hidden: {
		x: "100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,

		/*
    - Create the transition from hidden to visible. We want our custom transition to apply when 
      the page is sliding in and becoming visible. That is why we put the transition element for 
      visible only. By defining transition here, this transition will be automatically used when we 
      use our 'visible' variant.
    */
		transition: {
			type: "spring",
			delay: 0.5,
		},
	},
};

/*
- nextVariants: Variants for our next button that appears to take hte user to the next page

*/
const nextVariants = {
	hidden: {
		x: "-100vw",
	},
	visible: {
		x: 0,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
};


const buttonVariants = {
	hover: {
		scale: 1.1,

		// Create a shadow on the text
		textShadow: "3px 3px 3px rgb(255,255,255)",

		// Create a shadow on the box itself
		boxShadow: "1px 1px 1px rgb(255,255,255)",

		transition: {
			duration: 0.5, // duration of each keyframe/cycle
			repeat: Infinity, // number of keyframes or cycles we want to do
			repeatType: "reverse"

		}
	}
}


const Base = ({ addBase, pizza }) => {
	const bases = ["Classic", "Thin & Crispy", "Thick Crust"];

	return (
		<motion.div


			/*
			  + Using references to variants
			  1. Define the 'variants' object we want to use
			  2. For the initial animation, just pass in the property of our 'containerVariants' object
				we want to use. So here we want initial to get 'containerVariants.hidden', so just 
				use "hidden".
			  3. For the 'animate' animation, we want it to use 'containerVariants.visible' so 
				put 'visible'.
			  4. Since we put the 'transition' propery on our 'containerVariants.visible', it automatically
				applies the transition when animating from 'initial' to 'animate'. As a result we don't need 
				to explicitly define transition on our motion.div
			  */
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="base container">
			<h3>Step 1: Choose Your Base</h3>
			{/* List of pizza bases that the user can add that we'll have */}
			<ul>
				{bases.map((base) => {
					let spanClass = pizza.base === base ? "active" : "";
					return (
						<motion.li
							whileHover={{
								scale: 1.2,
								color: "#f8e112",
								originX: 0,
							}}
							// Make the transitions on our animations springy
							transition={{ type: "spring", stiffness: 300 }}
							key={base}
							onClick={() => addBase(base)}>
							<span className={spanClass}>{base}</span>
						</motion.li>
					);
				})}
			</ul>

			{/* 
      - Initial and animate example: Only render the 'next page' button when a pizza base has been selected. We want to animate the entering of this button so the animation
        should make it look like it's appearing from the left and zooming towards the right. So we need to make it a motion.div 
        
        1. initial: On render we need to ensure it's off the viewport entirely, so off the user's page initially;
                    Initially move the button '100vw' to the left of its natural dom position
        2. animate: Then once we're animating it, it should end up 0 pixels from where it naturally should be in the dom
		
		- Propagation: Variants propagate animation attributes down through the dom. When we have a parent using variant attributes, those 
			attribute names will be inherited by children motion elements. For example, our 'motion.div' parent element uses variants, where 
			the initial = 'hidden' and animate = 'visible'. Now for child motion elements, if these children use variants, like this one here,
			they will automatically/implicitly have initial AND animate attributes matching the value of the parent. So this child motion element
			automatically has initial='hidden' AND animate='visible' and so it looks for those variants within its own variants object (nextVariants)
			in this case. As a result, if a child motion uses variants, we may not  have to explicitly write those out, 
			because those initial and nimate attributes have been passed down by a parent motion.

		- NOTE: The child isn't inheriting the parent's variant, so it isn't doing variant={containerVariants}. It's just getting the values for initial and animate
			from the parent, and those are automatically applying, and being used on the child's own variant (nextVariant in this case). So since we defined 'hidden' and 
			'visible' in the parent, when the child uses variants, it automatically looks for those respective 'hidden' and 'visible' attributes for the initial and animate
			properties. Of course if nextVariant's properties had different names such as 'hide' and 'show' it wouldn't work was we would be implicitly looking for 
			'hidden' and 'visible'. At that point you'd have to manually pass in initial and animate.

        */}
			{pizza.base && (
				<motion.div
					variants={nextVariants}

					className="next">
					<Link to="/toppings">
						<motion.button

							variants={ buttonVariants}
							whileHover="hover">
							Next
						</motion.button>
					</Link>
				</motion.div>
			)}
		</motion.div>
	);
};

export default Base;
