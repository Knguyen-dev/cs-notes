/*
+ Using headers with axios:

- In this example, the api is going to return json
  so we have to do "Accept: 'application/json'". You 
  can explicitly set the type of content you're wanting 
  to receive. So setting application/json will let axios
  parse the response as json.


*/

import { useState } from "react";
import axios from "axios";
const url = "https://icanhazdadjoke.com/";

const Headers = () => {
	const [joke, setJoke] = useState("random dad joke");

	const fetchDadJoke = async () => {
		try {
			// Define the 'Accept' property to set the content-type to application/json essentially.
			const { data } = await axios(url, {
				headers: {
					Accept: "application/json",
				},
			});

			setJoke(data.joke);
		} catch (err) {
			console.group(err.response.data.msg);
		}
	};

	return (
		<section className="section text-center">
			<button className="btn" onClick={fetchDadJoke}>
				random joke
			</button>
			<p className="dad-joke">{joke}</p>
		</section>
	);
};
export default Headers;
