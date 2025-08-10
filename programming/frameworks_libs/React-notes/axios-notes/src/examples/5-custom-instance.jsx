/* eslint-disable no-unused-vars */
/*
+ Custom instance: 
- You can create a custom axios fetch function with its own 
  custom configurations. 

- How to:
1. Create our 'custom.js' file where we'll define our custom
  axios fetch function.


*/

import { useEffect } from "react";

// for regular axios
import axios from "axios";

// our custom fetch function
import authFetch from "../axios/custom";

const randomUserUrl = "https://randomuser.me/api";

const CustomInstance = () => {
	const fetchData = async () => {
		try {
			// authFetch has that base url, so the final url will be concatenated
			// and fetch from baseURL + '/react-store-products'. Also note that
			// we also already set the 'Accept' too.
			const resp1 = await authFetch("/react-store-products");

			// Standard request with axios
			const resp2 = await axios(randomUserUrl);
		} catch (err) {
			// If resp1 was invalid, we'd catch the error for resp1.
			// If resp2 was invalid, that means resp1 was good so it wasn't caught
			console.log(err.response);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return <h2 className="text-center">custom instance</h2>;
};
export default CustomInstance;
