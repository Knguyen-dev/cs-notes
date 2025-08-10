/*



+ Different send methods:
1. res.send(data); Good for testing, but not the most common thing you want to use
2. res.status(statusCode); sets the status code for the response
3. res.json(yourJson); Sends back your data as json, just make sure you format 
  yourJson as a javascript object or in json format.
4. res.download(filePath); Prompts a download window for downloading the file
  to some path.
5. res.render(pathToFile, additionalData); Renders a template file. However you need to set up your 
  template engine first. You can pass in additional variables and data to be loaded into that file 
  as well.

+ Rendering template data:
- Let's look at our get request. We render
  'index' template file, which Express looks for in our 
  'views' folder. We pass our 'locals' object, which is the data
  we want to use in that file. So 


*/
const express = require("express");
const app = express();
const port = 3000;

// Import userRouter
const userRouter = require("./routes/users");

// Set view engine to ejs
app.set("view engine", "ejs");

/*
+ Rendering and serving static files: 


1. Create a folder called "public", which is where our static files will go.
2. We placed an 'about.html' in there. This is a static or unchanging html file
  which is why it isn't a template file such as .ejs.
3. Use express's middleware of static to define the folder where our static
  assets are. Once we do this, it serves all of the assets from that directory
  immediately.

4. If we didn't have a .get() for our 'index.ejs', then our 'index.html' file
  will be served instead. Note it has to be named index.html.
5. As well as this we have an image in 'images' and its path compared to 
  server is "/images/night_background.jpg". Users can then access this image 
  using the url "http://localhost:3000/images/night_background.jpg"
- Summary: This is how we serve static assets in Express. With this we can not 
  only serve images, but we could also start serving css files, js files, etc.
*/

app.use(express.static("public"));

/*
- Both are similar as they allow us to parse the data in the body
  of a request. But they are slightly different in purpose
1. urlencoded allows us to work with the forms and their name attributes.
2. Allows us to deal the case of our POST and PUT requests having 
  JSON data instead.
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
+ Application Level Middleware: When any of the application's routes
  get a request, the logger middleware will be the first piece of middleware that's
  executed in the request-response cycle. 
*/
// app.use(logger)

/*
+ Using middleware for a particular route handlers or endpoints. Here we add 
  the logger middleware to our GET route handler. So when we 
  receive a GET request at the index route, we first call the logger
  middleware, and then the route handler executed after.
*/
app.get("/", logger, (req, res) => {
	res.render("index", { text: "World" });
});

// Integrate the user router with our main express app. Prefix routes with '/users'
// So your routes in users.js will be  "/users/new" or "/users/some_route"
app.use("/users", userRouter);

/*
+ Middleware: Again middleware is code that is executed between when you
  get your request, and when you send out that response. Let's create
  a middleware function for logging out stuff. Every middleware has
  'req', 'res', and 'next'. They all should have access to the request and response
  and be able to modify it, and next so that the next middleware or function in the
  chain can receive those changes.

- How to use and add middleware functions:
1. define your middleware function here it's logger(), make sure you're
  calling next() so that the next function in the chain is called.
2. Use app.use(someFunc) to add someFunc as middleware. So do app.use(logger).

3. The order of middleware matters it runs top to bottom, so when I added
  app.use(logger) at the top, it is the first middleware to run and then
  any route handler below it will run second. 
  
  - However if I moved 'app.use(logger)' after my index route handler, then my 
  logger middleware would no longer be called after the triggering of the 
  index route handler. Don't worry it's still in the middleware stack and 
  we're still expecting it to be run, we just need to call next() on our 
  index route handler so that the next middleware (our logger) can be called.
  Of course, this in a real world scenario you probably won't see your 
  middleware structured in a way that would force the route handlers to 
  call next(), but this example is a good demonstration of the way the 
  code in Express is run top to bottom. 



- NOTE: Router handlers also have the next() function, but since they're usually
  the last in line in your request-response cycle, there's no need to use it because
  there's no middleware function or extra code that's going to be executed after them.
*/
function logger(req, res, next) {
	console.log(`Original URL: ${req.originalUrl}`);
	next();
}

app.listen(port, () => {
	console.log(`Started listening at port ${port}`);
});
