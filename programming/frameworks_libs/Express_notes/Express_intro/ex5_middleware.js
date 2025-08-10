/*
+ Using Middleware:
- Middleware functions: Usually perform some operation on the request or response and then call 
  the next function on the stack which can be more middleware, or a route handler. 
  Most apps use third-party middleware to simplify common tasks such as 
  cookies, sessions, user authentication, getting data from a POST request, etc.
  Middleware functions have the same arguments 'request' and 'response' like
  route handlers, but they also have a third one called 'next'. Your 
  middleware functions will call this function to tell Express to go to the 
  next middleware function, except when they are the last thing in the 
  request-cycle.

- Route handler: Your route functions end the HTTP request-response cycle
  by returning some response to the HTTP client.


+ How to setup and use middleware:
1. npm install morgan; installing morgan http request logger middleware
2. Use it in your code with app.use(). You can use app.use() to 
  add a middleware function to your processing chain.


+ NOTE:
1. Middleware and routing functions are called in the order 
  they're declared, but for some middleware how we order them
  is important. For example if session middleware needs cookies 
  middleware, then we order it so the cookies handler is added first.
  Almost always middleware is called before creating routes. If not 
  then our route handlers won't have the functionality of your middleware.


+ How the request cycle works:
1. Request Phase: When client makes HTTP request to Express server.
  The request enters the application and the request phase. Activated
  by a router handler.
2. 

+ List of Express middleware packages: https://expressjs.com/en/resources/middleware.html

*/

const express = require("express");
const logger = require("morgan");
const app = express();
app.use(logger("dev"));

/*
+ Create a middleware function
1. Perform some operations
2. Call next() so Express calls the next middleware function in the chain
  also known as your request-response cycle or process.
*/
const a_middleware_function = function (req, res, next) {
	// Perform some operations
	next();
};

// Middleware function added with for all routes and verbs
app.use(a_middleware_function);

/*
- Middleware function added for a specific route. 
  So the middleware function is called first, and next
  is a route handler.
*/
app.use("/someroute", a_middleware_function);

/*
- Middleware function added for a specific HTTP verb and route.
*/
app.get("/", a_middleware_function);
