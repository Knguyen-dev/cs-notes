# Express notes

# Introducing Express:

- Express: A popular Node framework that allows us to handle backend stuff more easily.
  1. Handles HTTP request such as GET, POST, etc.
  2. Allows us to generate responses by inserting data into templates. Emphasis on the
     idea of a dynamic site.
  3. Sets up stuff such as port number and makes it easy to link up your templates
  4. Lets us add request processing middleware at any point within the request
     handling process.
  - It's actually very small and simple, however developers have created a lot of middleware
    packages that address various web dev problems for us! There are now various 3rd party libraries
    that help with cookies, sessions, user auth, etc. that we can use with Express.
  - Express is 'unopinionated' meaning there isn't a 'right-way' to do things. This makes
    the framework flexible as you can take many paths to solve a signle problem.

# How to use express and what does the code look like:

- Express provides methods to specify what function is called for a particular
  HTTP verb such as GET, POST, etc. You use these methods such as .get("/account_page", loadAccountPage),
  to create a route. Here we're creating a GET request for when the user goes on the 'account_page'
  route. So when we receive the GET request, the function loadAccountPage is triggered!

# Typical Project setup:

1. npm init -y; initialize NodeJS project with default values.
   Our entry point 'main' in package.json is "index.js".
2. npm install express; Installs Express.js
3. npm install eslint --save-dev; installs eslint as a dev dependency.
   Set up a script to lint in 'src' folder for all other .js files.
4. Create an 'index.js' in the root of our application, so
   it should be in the same directory as package.json. Import
   Express and set it up.

# Using Express Application Generator

1. npm install express-generator -g; installs 'Express Application Generator'
   globally, so you cna call it from anywhere. Doing 'express helloworld' creates
   an Express app called 'helloworld'. This is pretty helpful for creating a base
   Express app's skeleton with all of the tools people use.
2. express my-express-app; creates express app directory with package.json.
   Now go to that directory and install its dependencies.
3. npm install; install all dependencies from that package.json
4. npm run start; script to start the application, listed in your package.json

- BOOK MARK: Starting off with traversy medias and web dev simplified's
  basic tutorials to make ensure we got the foundations.

# Credits:

1. Mdn (Intro to Express): https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
2. Web Dev Simplified (Crash Course Express): https://www.youtube.com/watch?v=SccSCuHhOw0
3. Web Dev Simplified (Middleware Tutorial): https://www.youtube.com/watch?v=lY6icfhap2o
4. Web Dev Simplified (Mongoose Crash Course): https://youtu.be/DZBGEVgL2eE?feature=shared
