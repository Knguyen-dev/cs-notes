/*
+ HTTP Module and Http requests in NodeJs:

+ Performing a GET request: There are many ways to do a get requests.
  The simplest way is to do it is to use an external library such as Axios. However
  you could do this built in, using no third party libraries.
*/

const axios = require("axios");

// GET Request with Axios
function axiosGET() {
	axios
		.get("https://example.com/todos")
		.then((res) => {
			console.log(`statusCode: ${res.status}`);
			console.log("Data: ", res.data);
		})
		.catch((error) => {
			console.error(error);
		});
}

/*
+ GET Request with standard nodejs modules
- To do put or delete, just change options.method 
value to the appropriate http method.
*/
const https = require("https");
function standardGET() {
	const options = {
		// define request info
		hostname: "example.com",
		port: 443,
		path: "/todos",
		method: "GET",
	};
	const request = https.request(options, (response) => {
		console.log("Status Code: ", response.statusCode);

		// Create event listener for handling the response's data when we got it
		// This returns a Buffer object by default, so using process.stdout.write writes the raw
		// data to the console, allowing us to see the actual content.
		response.on("data", (data) => {
			process.stdout.write(data);
		});
	});
	// Create an error catching event listener
	request.on("error", (error) => {
		console.error("Error fetching todos: ", error);
	});
	// End the request
	request.end();
}

// Doing a POST request in axios
function axiosPOST() {
	axios
		.post("https://whatever.com/todos", {
			todo: "Buy the mlik",
		})
		.then((response) => {
			console.log("Status Code: ", response.status);
			console.log(response);
		})
		.catch((error) => {
			console.error(error);
		});
}

function standardPOST() {
	const data = JSON.stringify({
		todo: "Buy the milk",
	});

	const options = {
		hostname: "whatever.com",
		port: 443,
		path: "/todos",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": data.length,
		},
	};

	const req = https.request(options, (res) => {
		console.log(`statusCode: ${res.statusCode}`);
		res.on("data", (d) => {
			process.stdout.write(d);
		});
	});

	req.on("error", (error) => {
		console.error(error);
	});
}
