// Library imports
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

// Importing our routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

// Create express app
const app = express();

// Set up mongoose connection with atlas database
const mongoose = require("mongoose");
async function main() {
	await mongoose.connect(process.env.uri);
}
try {
	main();
} catch (e) {
	console.log(e);
}

app.use(compression()); // compress all routes

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
		},
	})
);

// Create our rate limiter, so a maximum of 20 requests per minute, until it stops you
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

/*
+ View Engine Setup:
1. Sets the 'views' config option. Specifies where the application
  should look for the views templates. We construct an absolute path 
  to that directory. Now when we use res.render("some_file") Express
  looks for the "some_file" template inside the 'views' directory we 
  specified.
2. Sets up view engine as ejs as well.
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/*
+ Set up application's middleware stack.
1. Sets up logger middleware
2. Allows us to access body of requests when those requests send json data
3. Access request body and have the data parsed in object form. Used for 
  accessing values of form fields in the request body.
4. Parses incoming cookies from request header and allows us to access
  them in req.cookies.
5. Serve all static assets from public directory
6. Allow ejs to use layouts
*/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*
+ Add our routers to our application (adding them to our request-handling chain)
1. Prefix with '/' to indicate it's the index route section of our site
2. Prefix with "/users" to indicate its the user's section. So all routes 
  inside usersRouter will be accessed with "/users" prefixed to them such
  as "/users/1" or "/users/some_route"
3. Add the catalog router to our middleware stack. Prepend the '/catalog'
  route prefix, so all routes in the catalogRouter will be prefixed 
  with '/catalog'. So to access a list of books, before you'd do '/books', but
  now you'd do '/catalog/books'
*/

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

/*
+ Catch HTTP 404 and forward to error handler:


- NOTE: 

  1. Notice our error handler is the last middleware to be declared,
  so it's the last one in the chain. Express has a built-in error handling 
  which takes care of any remaining errors. When we pass an error to next(),
  it's handled by the built-in error handler, and written to the client 
  with the stack trace.

  2. If we do next(err) and pass an error to our next, Express skips 
    all remaining non-error handling middleware. So all functions 
    that don't have 'err' or something like that at the beginning it 
    will skip the function. So a function like this will be automatically
    skipped, and that makes sense since this is supposed to catch bad routes.
    However, when we're returning an error since bad dynamic id, this won't 
    be triggered because it doesn't have err parameter.


  3. Express doesn't know the names of our parameters. But it does have this 
    rule: If you have 2 parameters, it's going to be (req, res). If you 
    have three values, they are going to be (req, res, next). If you have 
    four values, they will be (err, req, res, next). This is why you 
    see that sometimes a function that (req, res, next), but we only 
    use next and not the request or the response.  
  

*/
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
/*
1. Setting locals: Sets local variables 'message' and 'error' on the 
  response object. We check the environment variable, to see 
  whether we have a local 'error' variable as well. 

2. req.app.get("env"): A builtin Express method that gets the node_env environment variable
  value from our environment variables.

3. Here we want to render the error page, but if we're in production, we don't
  want to render out an error object. Our error messages would be defined
  when we do new Error("Username already taken") or something similar as we 
  want them to be human readable to the user.

4. Now the in development, we get the error code and error info, but real users
  just get the simple error message 
*/
app.use(function (err, req, res, next) {
	const errorMessage = err.message || "Internal Server Error";
	const statusCode = err.status | 500;

	res.status(statusCode).render("error", {
		title: "Error",
		message: errorMessage,
		error: req.app.get("env") === "development" ? err : undefined,
	});
});

// Export our express app object, which will be imported to www.js (entrypoint)
module.exports = app;
