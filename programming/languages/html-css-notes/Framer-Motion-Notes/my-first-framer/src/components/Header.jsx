/*
+ Animating SVGS

- Situation:
1. We want to spin the svg on the screen.
2. We also want to animate the 'paths' so it looks like the svgs are 
	being drawn as the user loads the page. So we'll mess with the 'pathLength'
	property, which decides how long the svg path is. If we can add a transition to this
	we can aniamte the drawing of an svg's path from start to end.

*/

import { motion } from "framer-motion";

// Create a rotation animation with the svg
const svgVariants = {
	hidden: { rotate: -180 },
	visible: {
		rotate: 0,
		transition: { duration: 1 },
	},
};


const pathVariants = {
	hidden: {
		opacity: 0,
		pathLength: 0,
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		transition: {
			// Takes 2 seconds for the entire animation
			duration: 2,

			// Just a nice transition style
			ease: "easeInOut"
		}
	}
}



const Header = () => {
	return (
		<header>
			<motion.div className="logo"
				// Makes the div, or logo in this case draggable
				drag
				/*
				- Defines the amount of pixels it can be away from its 
				starting position. So zeroes all around means after dragging it,
				it will spring back to its original position. However bottom: 50 means that 
				it can be 50 pixels down, relative to the starting point, without being snapped back up
				*/
				dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}

				/*
				- dragElastic: Controls how hard it is to drag. The lower the number, the less elastic and more 
				difficult it'll be to drag the logo. The higher the number the easier it'll be to drag it.
				*/
				dragElastic={ 1}

			>
				<motion.svg
					variants={svgVariants}
					initial="hidden"
					animate="visible"
					className="pizza-svg"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100">
					<motion.path
						// Then of course the initial and nimate properties are inherited
						variants={ pathVariants}
						fill="none"
						strokeWidth="2"
						d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
					/>
					<motion.path
						variants={pathVariants}
						fill="none"
						strokeWidth="2"
						d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
					/>
				</motion.svg>
			</motion.div>

			<motion.div
				className="title"
				initial={{ y: -250 }}
				animate={{ y: -10 }}
				transition={{
					delay: 0.2,
					type: "spring",
					stiffness: 120,
				}}>
				<h1>Pizza Joint</h1>
			</motion.div>
		</header>
	);
};

export default Header;
