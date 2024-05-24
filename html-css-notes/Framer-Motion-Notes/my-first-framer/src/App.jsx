import { useState } from "react";

import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Home from "../../my-first-framer/src/components/Home";
import Base from "../../my-first-framer/src/components/Base";
import Toppings from "../../my-first-framer/src/components/Toppings";
import Order from "../../my-first-framer/src/components/Order";

function App() {
	/*
    - Keeps track of the stetings on our pizza as the user goes through our different pages.
      Well pass this pizza object down through our components.
    */
	const [pizza, setPizza] = useState({ base: "", toppings: [] });

	// Sets a base for the pizza
	const addBase = (base) => {
		setPizza({ ...pizza, base });
	};

	/*
  + Handles adding toppings to the pizza
  1. If topping not already included, add the topping to our toppings array
  2. Else if the topping is already included, that means the user wants to remove the topping
    so remove the topping from our array.
  */
	const addTopping = (topping) => {
		let newToppings;
		if (!pizza.toppings.includes(topping)) {
			newToppings = [...pizza.toppings, topping];
		} else {
			newToppings = pizza.toppings.filter((item) => item !== topping);
		}
		setPizza({ ...pizza, toppings: newToppings });
	};

	const myRouter = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="base" element={<Base addBase={addBase} pizza={pizza} />} />
				<Route
					path="toppings"
					element={<Toppings addBase={addTopping} pizza={pizza} />}
				/>
				<Route path="order" element={<Order pizza={pizza} />} />
			</Route>
		)
	);

	return <RouterProvider router={myRouter} />;
}

export default App;
