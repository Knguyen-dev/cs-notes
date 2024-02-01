# Fullstack:

- When talking about a website, it means the website has both front and back end technologies. Fullstack applications can be created with many different technologies, and acronyms have been used over the years such as MEAN, MERN, DJANGO stack, Ruby on Rails stack, etc!

1. Front end: Part of the application the user interacts with directly in the browser. Includes technologies such as HTML/CSS/JS, with frameworks and libraries such as React, Angular, and Vue.js. Here the technologies create the UI.
2. Back end: The server and database. Here it handles data storage, security, user auth, and other server-side logic.

# Mern Stack:

- A combo of four different technologies we can put into a website that covers the front and back end of a website.
  It consists of MongoDb, Express, React, and Node.js. In the browser, we have the React app that handles user interaction and client side routing to show pages that are typically 'static' or don't require any data from our database. Then when we want to render a page with data, the react app sends a request to the backend-server, which
  acts as an API. Our Express app queries the MongoDB data, then sends back our data as json. As a result, our react
  app can display that data in its template.

1. React: Your front end library
2. Express & Node.js: Used to make the backend api that interacts with the front end
3. MongoDB: The database

- NOTE: Why not remove the express/node app and just have the React app interact with the database directly? Well one of the reasons is due to security, as we'd be exposing sensitive data in our front end code. So putting stuff like an admin username/data in the backend, we're hiding it from people. In the end just know having a server makes it better for security, scalability, and development.
