# Mern Stack Tutorial and Notes

- We separate the front and back end code in separate folders. Here 'backend' is our
  express app, and 'frontend' is our react app. So here we have the project's root directory
  opened, but we're able to cd into the front or back end folders as we please. So first
  we worked on our express backend, went back to root and created a react
  project with vite. Remember that our react app, and our express app are two different
  applications, so they have different package.json and dependencies

# React setup

1. npm create vite@latest frontend -- --template react; initialize react app with Vite
2. npm i react-router-dom

# Server setup:

1. npm i express mongoose
2. npm i -D nodemon dotenv

# New Packages:

1. validator: Just a validation library that can only sanitize strings. You could also
   use the express-validator library as it actually also has the same methods.
2. jsonwebtoken: Popular package for implementing JWTs.

# Using JWT for authentication:

- The process goes the user has a good login or signup. The server side sends
  back a JWT token. And with this token, if our react app knows we have this token we
  can say the user is authenticated. Else if on our front end we check and we don't
  have the token, we can say, no the user is not authenticated. As a result we
  could protect certain client side pages and do conditional rendering on the front
  end. We could then restrict access to the api, and make it so only authenticated
  users can use the api. For an api request, if there's a valid jwt, we give them
  access, else we don't give them access.

- In our app, we're going to give the browser a token in two situations. First, when
  the user successfully signs up, as usually when a person signs up to a website
  they're automatically authenticated and logged in. Second is in our login logic
  when the user actually logs in like normal. So once we're done creating the JWT
  in teh backend, we need our front-end to know when the user's authenticated.
  So in our react-app, we're going to have some global state to track whether
  they're logged in or not. Obviously we're going to do this with react context,
  and the global state would likely contain a value such as the user's email.

# Credits:

1. Mern Stack Intro Playlist: https://youtu.be/98BzS5Oz5E4?feature=shared
2. Mern Auth Playlist: https://youtu.be/WsRBmwNkv3Q?feature=shared

# Test users

1. 'knguyen44@ivytech.edu' with password "Password_123"

- BOOK MARK: On part 15
