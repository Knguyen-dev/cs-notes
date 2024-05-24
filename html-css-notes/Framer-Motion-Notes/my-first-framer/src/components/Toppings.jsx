/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Toppings = ({ addTopping, pizza }) => {
	let toppings = [
		"mushrooms",
		"peppers",
		"onions",
		"olives",
		"extra cheese",
		"tomatoes",
	];

	return (
		<div className="toppings container">
			<h3>Step 2: Choose Toppings</h3>
			{/* Render a list of toppings the user cna interact with */}
			<ul>
				{toppings.map((topping) => {
					let spanClass = pizza.toppings.includes(topping) ? "active" : "";
					return (
						<motion.li
							key={topping}
							onClick={() => addTopping(topping)}
							/*
              - By default, when scaling it grows a little to the left. To
                control this we need to control originX 'horizontal origin of the transform'
                and set it to 0.
              */
							whileHover={{
								scale: 1.2,
								color: "#f8e112",
								originX: 0,
							}}
							// Make the transitions on our animations springy
							transition={{ type: "spring", stiffness: 300 }}>
							<span className={spanClass}>{topping}</span>
						</motion.li>
					);
				})}
			</ul>

			{/* Link to the next page */}
			<Link to="/order">
				<motion.button
					whileHover={{
						// Make button 1.1 times bigger when hovering over it
						scale: 1.1,

						// Create a shadow on the text
						textShadow: "3px 3px 3px rgb(255,255,255)",

						// Create a shadow on the box itself
						boxShadow: "1px 1px 1px rgb(255,255,255)",
					}}>
					Order
				</motion.button>
			</Link>
		</div>
	);
};

export default Toppings;
