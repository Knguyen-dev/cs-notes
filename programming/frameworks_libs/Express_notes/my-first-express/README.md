# Project Setup
1. npm init -y; initialize default node project
1. npm install express; install express
2. npm install nodemon --save-dev; 


# Middleware:
- Code, functions, or some operation that is going to run between the time the server gets the request 
  time

  
# Views and Templating Engines:
- In Express, by default your markup files go into a folder called
  'views'. To to output your 'views' or template page files, you need
  a view engine. With this, you'll be able to load in data to your template
  files when you need them.

1. npm install ejs; ejs is a library for our view engine
2. Install 'EJS language support' extension;
3. Now you just set your view engine in server.js and 
  replace '.html' to '.ejs'. Also the reason we're using 
  ejs is because it's very similar to regular html, but 
  another popular engine is 'pug'.

# Route objects:
- To prevent your server.js file from getting too big, create a 'routes'
  folder to contain the files for the various sections of your site. Here
  we created a 'user.js' in our routes folder for all of the routes handlers
  relating to users.
