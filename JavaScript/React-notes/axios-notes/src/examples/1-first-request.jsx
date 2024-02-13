/*
+ Intro to axios response object:

response = {
  config: Axios request configurations,
  data: Your json data that you want, this is the main thing.
  headers: Your http headers such as "content-type",

  request: More info about the request you made,
  status: Status code of the response,
  statusText: Text associated with status code.

}

+ Errors:
- With fetch, only network errors are considered errors. So like 404 not found
  would be a good response. However, with axios only status codes 200-299 
  are valid, whilst everything else is an error. So this means something like 404 is 
  an error with axios, which makes things helpful.

*/

import { useEffect } from "react";
import axios from "axios";
const url = "https://course-api.com/react-store-productss";

const FirstRequest = () => {
	const fetchData = async () => {
		try {
			// Will return a promise, so we do async/await, but also we'll use try/catch
			// in case of bad responses.
			// Fetch data at that 'url', a get request by default
			const response = await axios(url);

			const data = response.data;

			console.log(data);
		} catch (err) {
			/*
      - When you get an error, you access the response object with error.response.
        So let's say we know the backend will send back json saying {msg: "Page not found"} when 
        there's something like a server error. We will do err.response.data, as we're 
        getting the response object from the error object and we're getting back the error message 
        that the server sent in json.

      - NOTE: Notice how we never do if (response.ok). This is because if the status
        for the fetch is not in 200-299, axios automatically throws an error, allowing us to catch it 
        in here! Just very neat.
      */
			const errorMessage = err.response.data.msg;
			console.log(errorMessage);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return <h2 className="text-center">first request</h2>;
};
export default FirstRequest;
