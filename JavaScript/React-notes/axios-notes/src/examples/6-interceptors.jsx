/* eslint-disable no-unused-vars */
/*
+ Interceptors:
- Functions that axios runs and calls to transform/change our request
  before it leaves our application to the endpoint. You can add 
  interceptors to custom and global instances, but in the end 
  remember they are just functions.




*/

import { useEffect } from "react";
import coolFetch from "../axios/interceptors";

const Interceptors = () => {
	const fetchData = async () => {
		try {
			const response = await coolFetch("/react-store-products");
		} catch (error) {
			console.log("Got an error!");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return <h2 className="text-center">interceptors</h2>;
};
export default Interceptors;
