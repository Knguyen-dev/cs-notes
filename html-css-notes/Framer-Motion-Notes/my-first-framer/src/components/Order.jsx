/* eslint-disable react/prop-types */

const Order = ({ pizza }) => {
	return (
		<div className="container order">
			<h2>Thank you for your order :)</h2>
			{/* Simply rendering out the pizza information */}
			<p>You ordered a {pizza.base} pizza with:</p>
			{pizza.toppings.map((topping) => (
				<div key={topping}>{topping}</div>
			))}
		</div>
	);
};

export default Order;
