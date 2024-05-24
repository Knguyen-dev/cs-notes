import { motion } from "framer-motion";
const Header = () => {
	return (
		<header>
			<div className="logo">
				<svg
					className="pizza-svg"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100">
					<path
						fill="none"
						d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
					/>
					<path fill="none" d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z" />
				</svg>
			</div>

			<motion.div
				className="title"
				// Our title will render way off the page, literally into the bottom abyss so you won't see it at first
				initial={{ y: -250 }}
				// Then when we apply our main animation, we put the title at y: -10, as a result we expect the animation to be
				// it to rising up the page
				animate={{ y: -10 }}
				transition={{
					// Wait 0.2 seconds after render to start animation
					delay: 0.2,
					type: "spring",
					stiffness: 120, // how stiff/bouncy the spring is, the higher the bouncier; can only be used for type 'spring'
				}}>
				<h1>Pizza Joint</h1>
			</motion.div>
		</header>
	);
};

export default Header;
