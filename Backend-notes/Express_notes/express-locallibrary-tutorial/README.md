# Local Library
- Local Library is a project tutorial on mdn that's designed to take 
  you through all of the main things that you need to know about express.
  I'm following through and taking notes on it, so that I can not only
  learn more about Express and familiarize myself with it, but also have 
  this as a reference in the future.

# CRUD (Create, Read, Update, and Delete):
- Stands for Create, Read, Update, and Delete. These are the four 
  basic functions that are built in apps that have databases. Users 
  can expect to be able to create, read, update, and delete things.
  Such as creating instagram posts, reading or viewing the posts, updating
  and editing the posts, and deleting the posts. Create correlates to POST
  (app.post()), read to GET (app.get()), update to PUT (app.put()), and 
  DELETE (app.delete()).

# MVC (Model-View-Control):
- Stands for Model, View, and Controller. This refers to the architecture
  and how you organize your code by separating all of these actions into 
  3 main components.
1. Models: Building blocks of the database. Here you create your classes that define
  the objects in your database. Here we define models that define the structure for 
  each document in their respective MongoDB collections.
2. Views: Components that generates the UI of the application. 
3. Controllers: Components that decide what view to display and what information
  is going to put displayed on it. In our case, our controllers are our route handler
  functions that our express .get() type routes use. Our functions decide what components
  are going to be rendered, whether it's going to be an individual item such as a book
  or author, or an entire list of those items, etc.


# Luxon: 
- A modern and popular library for parsing, validating, and 
  working with dates. We'll use this to format our dates as by default, when
  we display our dates from our object models we get "Mon Apr 10 2020 15:49:58 GMT+1100 (Eastern Standard Time)" or something similar. We'll use luxon to format
  this as Apr 10th, 2020.
1. npm install luxon

# Working with forms in Express:
- We use forms to collect user info. Then we use html forms to 
  send data via a POST request. Then we take that form info and ultimately
  save that to our database. Often we use our GET request route for displaying 
  the form to the user on a certain page, and then the POST request for 
  handling the processing of form data. 

- Form handling process:
1. Display default form the first time it's requested. It could be blank or 
  pre-populated with initial values (e.g. updating a record)
2. Receive data from user, usually in POST request.
3. Validate and sanitize the data. Validating is checking if fields are 
  appropriate, whilst sanitization removes/replaces characters that may be 
  used to send malicious content to the server.
4. If any data is invalid, re-render the form, with error messages
5. If all data is valid, save the data to the database. Then you'd send 
  a notification email, etc.
6. Then once all that's done we redirect the user to another page.

- Packages:
1. npm install express-validator; module for performing validation/sanitization


# express-validator and server-side validation:
- We're returned variables 'body' and 'validationResult'. The validation
  and sanitization chains are middleware that should be passed to 
  our express route handler. When the middleware runs, each is run in 
  the order specified.
1. body: Here we can specify fields that we want to check, and then
  the error message we'll display if those fields are incorrect. Here
  we'll do things such as .trim() and .escape() to sanitize our input.

2. validationResult(req): Runs a validation check, making errors available 
  in a validation result object. This is similar to how we handle forms 
  in front-end react.


# form design: 
- To simplify the project. Our form will be limited to this:
1. Create an object using objects that already exist, so users will have to
  create any required AUthor or Genre instances before making any Book objects.
2. Delete an object if it isn't reference by other objects. So you won't be able
  to delete a book until all associated BookInstances have been deleted.

- Book mark: Currently working on learning about express-validator and 
  working with forms.


https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Date_formatting_using_moment


# Routes:
- We'll create 'controller' modules, which will just be 
  our callback fucntions for our routes for our four models.



# Templating with pug:
- Another popular choice for templating. We'll
  use it for right now, as we'll focus on more important
  backend stuff. We will deal with the intricacies of templating later.


# Templating with ejs:
- For templating, ejs doesn't provide a builtin way for 
  layouts, so we need to install 'express-ejs-layouts' and
  use it as middleware. 
1. Partials: We call these your 'components'. They're
  called partials, because they are simply a 
- Html escaping: The process of converting certain characters 
  into their HTML tag/entity equivalents to display them on the web.

<%= ... %> is for outtputing HTML-escaped output.

const userInput = '<script>alert("Hello, I am an XSS attack!");</script>';
<p><%= userInput %></p>

That would convert the '<' and '>' to their html escaped output turning
them into html entities:
<p>&lt;script&gt;alert("Hello, I am an XSS attack!");&lt;/script&gt;</p>


<%- ... %> is for outputting raw unescaped HTML.
The output would be: <p><script>alert("Hello, I am an XSS attack!");</script></p>

- Takeaway: Use <%- your_html_markup %> when you want to render html markup.
  If you're rendering text or user generated content, use <%= %> to prevent users inserting scripts.




# Packages:
1. cookie-parser: Used to parse cookie header and populate 
  request.cookies. Just gives us an easy way to access cookie information.
2. debug: Debugging utility tool.
3. npm install ejs
4. npm install express-ejs-layouts;
4. npm install express
3. morgan: An HTTP request logger middleware package.
4. http-error: Creates HTTP errors when we need them. Good
  for express error handling.
5. npm install mongodb
6. npm install mongoose
7. npm install nodemon
8. npm install express-async-handler


# Files:
1. www.js: Our entry point javascript file. It imports the actual express app
  object from 'app.js'. It sets the port, either to an environment variable or 
  port 3000. Finally it creates and starts an http server. Everything else is 
  boilerplate code that's not relevant.
2. app.js: Creates express application object 'app' and exports it. 

# Setup:

1. express express-locallibrary-tutorial --view=ejs; Generated the application via express application generator with ejs as view engine
2. Uninstalled 'cookie-parser', 'debug', 'http-errors' and 'morgan'. Then
   reinstalled them to get their latest versions.
3. Changed var to const in app.js. We left 'bin/www' alone, didn't touch it.

4. Run the below command in Windows Powershell to start the server:
  $ENV:DEBUG = "express-locallibrary-tutorial:*"; npm start


- NOTE: 
1. So it sets the environment variable 'DEBUG' to 'express-locallibrary-tutorial:*'.
  So this often enabled for debugging Nodejs applications. Setting up debugging for the 
  'express-locallibrary-tutorial' module, which is our project. The semi-colon ';' is used to 
  separate multiple commands, so right after it executes the npm start script.
2. Specifying the DEBUG variable enables console logging/debugging. We'll
  make this more simple and comfortable with nodemon and npm scripts.
- For getting to the directory
cd "onedrive/desktop/Sdev 265/CS-Programming-Notes/Backend-notes/Express_notes/express-locallibrary-tutorial"



# Killing ports:
- Sometimes we may have left a server running. 
  Do 'npx kill-port 3000', to kill any server 
  on port 3000.


# Deployment setup:
- NODE_ENV should be set up to production to remove the
  error outputting.

1. npm install compression; Gzip compression
2. npm install helmet;
3. npm install express-rate-limit; limits repeated requests to endpoints.
4. Put your current node version in package.json. You can check your node's
   current version with 'node --version'. Then create entry called 'engine'
   in package.json and put >=YOUR_NODE_VERSION
5. Deploying via Render.

- NOTE: Make sure for your database, to allow global network access. So not
  only do you have to have your user and credentials, but any server from any
  ip can access your database cluster. This allows hosting sites to connect
  to your database since they're running on a different ip. As well as
  this, when deploying you don't have to include the .env file when running
  the script. So in my "start" command we run our .js file without the env
  file. If this was local this obviously wouldn't work since I need that file
  to connect to the database. But when working with PaaS providers, they automatically
  connect your application to an env file you specify.

# Deployment packages explained:

1. Gzip Compression: Web servers compress the HTTP response. We want to compress
   all of our routes to make our app run faster.
2. Helmet: Sets appropriate HTTP headers that help rpotect your app from well
   known vulnerabilities.
3. Add rate limiting: Limits the amount of times that API routes can be accessed.
   This helps prevent ddos, brute force, and other stuff. Third party services such
   as Cloudflare can also be if you need more advanced protection against ddos and
   other.
