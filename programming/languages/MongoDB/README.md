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
4. npm install mongodb; installs MongoDB driver for NodeJS.
5. Create 'app.js' as its going to be our entry point for our project or api.
  This is where most of our code is going to go.

# Database or API Pagination:
- The idea of responding back with 20 or so items per page, and 
  giving the option for the user to get the next page of items.
  Usually given by a 'next' property with a page number parameter 
  incremented or decremented. 




# POSTMAN
- Allows us to simulate requests to an api and the response 
  we get back. More importantly, we'd be able to do 
  POST, DELETE, and UPDATE requests which are difficult 
  to do in the browser without some front-end javascript. So
  POSTMAN is able to help us out and let us focus on the MongoDB.
  You can either download it or use their web app, but choose the desktop one so that you can test stuff on localhost.
1. Postman: https://www.postman.com/downloads/
2. Create a new collection, here we create a collection solely for 
  our requests related to the MongoDB notes api we're making.
3. Create a new request, make sure to save it. Then hit 'Send' to 
simulate making the api call at that endpoint. In the body
you should see your data. Note if your express server isn't running
then it won't be able to do the request. 
4. Now we don't have to even use the browser to test our bookstore api application. We can just use Postman and see the results of our fetch requests and database queries in Postman desktop app. However most importantly, this gives us an easy way to do other HTTP requests.

- NOTE: To make a POST request and add data, we went to the body tab, and 
  selected raw json as the data format we're sending. There we added the data
  of the book we wanted to add to the database.


# PUT vs PATCH:
- They're both about updating existing records in a database
  but have slight differences.
1. PUT: Update or create a resource at a specific URI. When sending PUT
  you send the entire data, including unchanged fields. They're 'idempotent'
  meaning, if you send multiple of the same one, it's the same effect as sending one.
2. PATCH: Designed for partially updating a resource, so just changing some fields and
  leaving others unchanged. Good for when you want to modify something, but not send
  the entire data-structure with all unchanged fields in the request. 


# Credits:

1. Net Ninja: https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA
2. MongoDB University: https://learn.mongodb.com/learning-paths/introduction-to-mongodb
3. MongoDB Node Driver Installation: https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/#std-label-node-quick-start-download-and-install
4. MongoDB NodeJS Docs: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/insert/
5. MongoDB into NodeJS Tutorial: https://www.youtube.com/watch?v=fbYExfeFsI0&t=243s
- NOTE: These notes will take from a combination of sources.



BOOK MARK: Still want to learn indexes and database transactions, and aggregation
  from MongoDB university.