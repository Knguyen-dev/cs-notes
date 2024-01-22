// Library imports
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Importing our routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

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
app.set("view engine", "ejs");

/*
+ Set up application's middleware stack.
1. Sets up logger middleware
2. Allows us to access body of requests when those requests send json data
3. Access request body and have the data parsed in object form. Used for 
  accessing values of form fields in the request body.
4. Parses incoming cookies from request header and allows us to access
  them in req.cookies.
5. Serve all static assets from public directory
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
*/

app.use("/", indexRouter);
app.use("/users", usersRouter);

/*
+ Catch HTTP 404 and forward to error handler


- NOTE: Notice our error handler is the last middleware to be declared,
  so it's the last one in the chain. This is standard.
*/
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// Export our express app object, which will be imported to www.js (entrypoint)
module.exports = app;
