/*
+ Let's create a server with Node.js

  http.createServer(callback): Callback function
    runs everytime a request comes in to the server. So like 
    you go to the home page, a request is sent to the server for that home page,
    and so this callback is run.

  - request: Comes in with a lot of information about the request,
    the type, where it came from, etc.
  
  .listen(port number, host name, callback we fire when we start listening): 
  
  - Localhost: Like a domain name on the web. But it points
    a loop back ip address '127.0.0.1'. This points directly to our
    own computer. So when we're connecting to localhost in the browser, 
    we're actually connecting back to our own computer.

  - Port number: Specific channel or port on our computer 
    that a program will comunicate through. Through these ports 
    or sockets, applications such as outlook, discord, steam, etc.
    will be able to transfer information and keep it separate from
    each other.
  
NOTE: See how our console.log() doesn't appear in the browser. This is 
  because all of this is server-side code, rather than client side.

+ Credits: 
1. NetNinja: https://www.youtube.com/watch?v=-HPZ1leCV8k&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=3
2. W3Schools: https://www.w3schools.com/nodejs/nodejs_http.asp

*/

const http = require("http");

function initializeServer() {
	const PORT = 3000;
	const server = http.createServer((request, response) => {
		console.log("A request was made");
	});

	// Initialize server to start listening for requests on localhost
	server.listen(PORT, "localhost", () => {
		console.log(`Started listening on port ${PORT}`);
	});
}

initializeServer();
