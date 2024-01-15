# MongoDB Notes:

# How MongoDB Stores Data (Collections & Documents):

- Collection: database can contain various 'collections'. For example
  a blog database could have a collection for "Users", "Blog Posts",
  and "Comments". Each collection is in charge of storing its own
  respective data.
- Documents: A document represents a record in the database. For example
  a single document in the 'Users' collection would contain information about
  an individual user. The data for the user would be formatted in a structure
  similar to a JSON object, just a key-value pair. Every document has a
  unique id, similar to primary keys in sql, that are created by MongoDB itself.

- Nested Documents: You could have a one of a document's value be another document,
  which would look like another json object inside, or an array of documents (JSON objects).
  Here "author" is an example of a nested document as its a document (json object) inside our root
  document (json object).

  An example document: {
  "title": "My first blog post",
  "author": {
  "name": "Yoshi",
  "email": "yoshi@ign.com",
  "role": "Game Reviewer",
  },
  "tags": ["video games", "reviews"],
  "upvotes": 20,
  "body": "Lorem Ipsum",
  "id": ObjectId("ai4je9cj")
  }


# MongoDB Drivers: 
- A lot of the time we interact with MongoDB from our code, in a NodeJS
  app, or a python app. We need to install a driver in order for our code
  to correctly work with MongoDB. For us we're using NodeJS for our example application.


# Project set up
1. npm init -y; initalize a node project for us
2. npm install express; Installing express
3. npm install nodemon; install for hot reloading, don't have to stop and start the server everytime when file changes.
4. npm install mongodb@6.3; installs MongoDB driver for NodeJS.
5. Create 'app.js' as its going to be our entry point for our project or api.
  This is where most of our code is going to go.




# Credits:

1. Net Ninja: https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA
2. MongoDB University: https://learn.mongodb.com/learning-paths/introduction-to-mongodb
3. MongoDB Node Driver Installation: https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/#std-label-node-quick-start-download-and-install

- NOTE: These notes will take from a combination of sources.
