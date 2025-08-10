/*
+ Create router for the user's section:
- Here we created a router for the user section.
  We're going to export this router and prefix it 
  with "/users". 


- For example: When the user types in a route it 
  goes from mtop to bottom to see if any matches. 
  Note that if you had the dynamic route above
  the '/new' route, and the user typed 
  "/users/new", it would trigger the dynamic route
  thinking 'new' was the id. So that's why we always
  have our dynamic routes near the bottom.
*/

const express = require("express");
const userRouter = express.Router();

userRouter.use(userLogger);

/*
+ Remember it's just an index route. Since we prefixed it with "/users"
  Then this get request is triggered when they go on "/users" route

- Parsing query parameters:
1. request.query.parameterName; 
  So if the user typed in /users?page=4, the request object's 
  query map would have the attribute 'page' as one of the query parameters, 
  and its value to be 4.
*/
userRouter.get("/", (req, res) => {
	console.log(`Page Number: ${req.query.page}`);

	res.send("User List");
});

userRouter.get("/new", (req, res) => {
	res.render("users/new", { firstName: "Test Name" });
});

userRouter.post("/", (req, res) => {
	const isValid = true;
	if (isValid) {
		users.push({ firstName: req.body.firstName });
		res.redirect(`/users/${users.length - 1}`);
	} else {
		console.log("Error");

		// If an error, render the new.ejs file or view again
		res.render("users/new");
	}

	res.send("Created User");
});

/*
+ Dynamic route: Define the route parameter 'id' with a colon.
  Then get the parameter under the same name in your callback.
  Also usually if it were a real app, you'd have a get, put, 
  and delete route handlers for getting, updating, and deleting
  a user via their ID.

- The above pattern is very common and express knows this and provided a
  solution so that we don't have to repeat ourselves much. So
  both of these technique do the same thing. We're defining
  route handlers for get, put, and delete for the dynamic route,
  hover the 'chaining' technique allows us to put all of those
  related route handlers in one place.
*/

userRouter
	.route("/:id")
	.get((req, res) => {
		res.send(`UseGet user with id ${req.params.id}`);
	})
	.put((req, res) => {
		res.send(`Update user with id ${req.params.id}`);
	})
	.delete((req, res) => {
		res.send(`Delete user with id ${req.params.id}`);
	});

// userRouter.get("/:id", (req, res) => {
// 	res.send(`UseGet user with id ${req.params.id}`);
// });
// userRouter.put("/:id", (req, res) => {
// 	res.send(`Update user with id ${req.params.id}`);
// });
// userRouter.delete("/:id", (req, res) => {
// 	res.send(`Delete user with id ${req.params.id}`);
// });

/*
+  someRouter.param(): Runs anytime it finds a param that matches the name you
  pass in. In this example, anytime the userRouter receives a router parameter
  of 'id' we run some code first before we reach the route handlers.
  It receives, the request, response, next function, and the vaLue of 
  the parameter we're detecting. 

- How it works:
1. request for "/users/2"
2. userRouter.params() is called.
3. next() function calls next middleware/code in the request-response process
  signaling the end of our params() function.
  
4. The benefit is that in our code, we can save the user to the body of our 
  request. This prevent allows us to access the user in our various route handlers
  so that our route handlers can do their job. It prevents the potential repetition
  of writing out the code of accessing the user in each route handler. Rather we 
  can just lift that logic up to our .params() function that runs before each
  of those 'id' related route handlers. This idea of modifying our request object
  to  pass information between our middleware functions is crucial and 
  very important!

  

5. The next function lets express call the appropriate next middleware in line
  which would one of our subsequent router handlers depending on the type of request.

  NOTE: 
  1. Remember this is only when the router handlers under userRouter's control
  detect that a parameter 'id' has been passed. This params function is actually
  middleware, and middleware is stuff between the request being received by your server
  and the response being served to the user.

  2. However, it should be noted that this isn't the only way to define 
  'application-level middleware' in the sense that we run the middleware for
  these dynamic routes

  - Middleware function is run when a dynamic route with id, so /user/:id 
  receives a request. Just another way to think about it.
  app.use('/:id', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })

*/

const users = [{ name: "Kyle" }, { name: "Sally" }];
userRouter.param("id", (req, res, next, id) => {
	// req.user = users[id]
	next();
});

/*
+ Router-level middleware: Of course you can define middleware for individual routers too.
  So the middleware activates when a request is received at any route controlled by that router.

- Activate the userLogger as middleware at the top, so that 
  it'll be run first for all route handlers below it. Note that 
  if I put my userLogger below .get("/some_route"), then when a GET request 
  is received on "/some_route" the route handler will trigger, but hte 
  userLogger doesn't. In order for the userLogger to trigger, my route handler
  must call next() so that the next middleware in line (userLogger) can be executed. 
  Because of how we put userLogger below, our get, our userLogger goes second since
  we're working top to bottom. Note that is a good example to demonstrate the top
  to bottom idea, but in practice you typically don't see our route handlers 
  call the next() because they're usually the last middleware functions in
  our request-response cycle.
  
  

- Everytime a request is received on one of the route
  handlers of the userRouter, the userLogger is triggered
  first, and then only after is the route handler triggered. 
  So now our userLogger middleware is only triggered for requests
  on the userRouter, and all other routes are unchanged.
*/
function userLogger(req, res, next) {
	console.log("Entered a user route");
	next();
}

module.exports = userRouter;
