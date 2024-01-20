// Importing express
const express = require("express");

const wikiRouter = require("./wiki");

// Instantiating an express application object
const app = express();
const port = 3000;

/*
+ Creating our route handlers for our requests:
1. In our first route we handle a GET request at the index route or "/".
  We use Express's verb method .get(route, cv) to handle a GET requets. Inside 
  we pass in the route we want to handle that request on, and a callback function.
  When .get() is triggered our callback is executed, and express helps us out
  by passing in a request (first param) and response (second param) object to our callback's parameters.
  Here we've seen it before, but we can access the request's information and 
  send back a response. Here we send back a response 'Hello World!'.


- NOTE: Of course there are multiple other response methods we could use 
  such as res.json() to send a json response or res.sendFile(). It's just 
  about what you want to send in the end.

2. app.all(), will be call in response to any HTTP method. Used for loading
  middleware functions at a particular path for all request methods. So this 
  handler will be executed for all requests to "/secret" route. For example,
  a GET request is made to "/secret", first the app.all() handler is fired.
  Then the next() function is called which passes control to the next middleware, 
  which basically means subsequent middleware function, or route handler in Express.js.

- NOTE: Remember middleware is just software or functiosn that are involved in the 
  request processing pipeline. Start with the request being received, then the 
  middleware processes it, and then we send a response.

+ Grouping route handlers: Often useful to group route handlers for a 
  particular part of the site, and let them be accessed using a common prefix.
  Such as "/wiki/". To do this, use the express.Router object. After 
  creating your routes, you'd export it and use it in your main router.


  - So here we did app.use(prefix, router) to use our express router we 
  created. We used "/wiki" to indicate it was the wikipedia part of our 
  site, and we used the router that contained the route handlers for 
  that part of our site.



*/
app.get("/", function (req, res) {
	res.send("Hello World!");
});

app.all("/secret", function (req, res, next) {
	console.log("Accessing secret section");
	next(); // pass control to the next handler
});

app.use("/wiki", wikiRouter);

// Set up our express server to listen for requests
app.listen(port, function () {
	console.log(`Example app listening on port ${port}`);
});
