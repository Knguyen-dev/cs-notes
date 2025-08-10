/*
+ Global Axios Instances: Here we're essentially setting default
  settings for all of our axios requests. So for example if you
  know your api backend is only sending back json, you can make 
  it so all of your requests are configured with "Accept: 'application/json'"

- How to:
1. Create an 'axios' folder. Here we'll create a 'global.js' file 
  to put all of our global settings in
2. You'd import that global.js file in our 'App.js' because that's going to 
  be like an umbrella that covers all of your fetch requests made in your application.
3. Now when you make your requests, if you go to network and look at your request
headers, you'll see 'Accept: application/json' because we set up and imported that 
code in 'global.js'.

- NOTE: This has drawbacks because for some of your endpoints, if they're 
  not returning json, or are set up differently then you probably don't 
  want a 'one size fits all' type of configuration with your axios. This is 
  where custom instances come in, which allow you to customize 

*/

import { useEffect } from "react";
import axios from "axios";
const productsUrl = "https://course-api.com/react-store-products";
const randomUserUrl = "https://randomuser.me/api";

const GlobalInstance = () => {
	const fetchData = async () => {
		const response1 = await axios(productsUrl);

		const response2 = await axios(randomUserUrl);

		console.log(response1);
		console.log(response2);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return <h2 className="text-center">global instance</h2>;
};
export default GlobalInstance;
