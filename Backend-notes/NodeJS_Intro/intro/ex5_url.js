/*
+ Url Module: Splits up a web address into readable parts.


+ Anatomy of a web address:
- Given a web address "https://www.example.com"


1. Scheme/Protocol: Specifies how the browser should retrieve the resource.
  Some examples are "http", "https", "ftp", etc.
2. Host/Domain: Main address of the site. Here 'www.example.com' is the host.
3. Path: Refers to specific location or resource on the server. For example
  in the url "https://www.example.com/page/about", the path is "/page/about".
4. Query Parameters: Used to send data to the server in key-value pairs. They
  come after the "?" symbol in teh URL and are separated by "&" symbol. For 
  instance "http://www.example.com/search?q=term&page=1" the keys for the 
  queries are 'q=term' and 'page=1' are the parameter names and values.
5. Fragments/Anchors: Specifies a section within a document. It appears after the 
  "#" symbol. For example, "https://www.example.com/page#section1", here 
  "section1" is the fragment. So here there would be an element on the html page
  with the id "section1".

+ How to use:
1. require "url"




+ Credits:
1. W3Schools: https://www.w3schools.com/nodejs/nodejs_url.asp
*/

const url = require("url");

/*
- Ex. 1: Splitting a web address into readable parts



*/
function example1() {
	const address = "http://localhost:8080/default.htm?year=2017&month=february";
	const parsedUrlObj = url.parse(address, true);

	const hostName = parsedUrlObj.host; // 'localhost:8000'; gets hostname and the port.
	const path = parsedUrlObj.pathname; // '/default.htm'
	const queryString = parsedUrlObj.search; // '?year=2017&month=february'
	const queryMap = parsedUrlObj.query; // {year: 2017, month: 'feburary'};

	console.log("hostName: ", hostName);
	console.log("path: ", path);
	console.log("queryString: ", queryString);
	console.log("queryMap: ", queryMap);
}

/*
- example 2: Using it to create a server
*/

// Assume url is required imported
const http = require("http");
const fs = require("fs");

function initializeServer() {
	http
		.createServer((request, response) => {
			// Get the path so "/about" or "/account"
			const urlObj = url.parse(request.url, true);

			// Add the location of your html files
			const fileName = "./page/" + urlObj.pathname;

			// Then read the html file. As a result we've done basic routing
			response.write("<h1>You are on the page</h1>");
		})
		.listen(8080);
}
