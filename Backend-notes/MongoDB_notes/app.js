// Import our database functions
const { connectToDb, getDb } = require("./db");

// Import from MongoDB
const { ObjectId } = require("mongodb");

// Import express
const express = require("express");

/*
+ Initializing app & middle ware.
1. To initialize express, just call the require for express
2. Our middleware. It basically helps us with sending JSON data
  through the body of requests, which is useful when we have something
  such as a POST request where we have to send json data about an item 
  in our request.
*/
const app = express();
app.use(express.json());

/*
+ Database connection:
1. If database connection is successful, then error is null, and
  we want to start listening for request with the express app
  since we know we can use the database.  Now that it's successful
  our variable db should now be defined, so database requests 
  should be possible now.
2. If database connection wasn't successful, we don't want
  to start listening because we know we won't be able to process
  requests successfully. 

NOTE: We define db, if connectToDb was successful, we 
  have no errors, so doing getDb() should work as well.
  As a result, we would be able to use 'db' variable to 
  interact with our MongoDB database. Now you can use 
  these in your routes, such as that get request.
*/
let db;

connectToDb((error) => {
	if (!error) {
		app.listen(3000, () => {
			console.log("App listening on port 3000");
		});
		db = getDb();
	}
});

/*
+ Routes and handling routes


+ Using find(), toArray(), and forEach: Find returns a cursor
  object that points towards your documents found by the query.
  We can use methods such as toArray() to get an array of documents
  or forEach to individually iterate through documents one at a time.
  To prevent straining network bandwidth, MongoDB fetches our documents in 
  batches of about 100 documents, so when using the forEach() on our cursor it iterates
  through a batch. Once that batch is done it gets the next batch to iterate.


NOTE: In the shell you notice we didn't need to do toArray or forEach to 
  see our documents displayed. This is because the shell automatically
  iterates over the first 20 documents for us when we use the find method. 
  Then we could use 'it' to iterate the next 20. So when working in JavaScript
  we work with the cursor.
*/

app.get("/books", (request, response) => {
	let books = [];

	db.collection("newBooks")
		.find()
		.sort({ author: 1 })
		// Note that forEach is asynchronous because we're also dealing with batches of documents when iterating
		.forEach((book) => books.push(book))
		.then(() => {
			// Return the books array as json and status 200.
			response.status(200).json(books);
		})
		.catch(() => {
			response.status(500).json({ error: "Could not fetch the documents!" });
		});
});

/*
+ A dynamic route:
- Denote our dynamic route with a ':' in Express, and then the name of the parameter
  so we'll just call it 'id', but you could literally call it something
  like 'beans' and it'd work. We basically want to make it so we can
  go to something like 'books/65a5621d7c61f60ec3ac6f2d' and it'd pop up
  with that book information.

1. Use our findOne method to find one book. We defined
  our route parameter as "id" so we must do 'request.params.id'
  to get the route parameter. MongoDB works with ObjectID("some_id") so we need to 
  call turn the route id to an ObjectId isntance.

3. Remember this is a fetch to a database (asyncrhonous) so use .then()
  to deal with our promise that resolves to a document. We return
  our document as json data when successful.

4. Our catch block does NOT handle the case where a document
  with that ID wasn't found. MongoDB will return null by default 
  when that happens. However, it handles cases where something
  unexpected happens during our database query such as network 
  ererors, database connection issues, etc.

+ Handling the case where user types in random stuff for the 
  id such as 'df;aoiejr;liaj'. The error here is that the 
  string isn't formatted correctly, rather than the idea that 
  MongoDB couldn't find matching document with that ID. And as a 
  result it shows an erro rscreen rather than sending back our 
  error json data. The string needs to be 12 bytes or 24 hex digit
  characters. Solution: ObjectId has a method to check if a a string
  is in valid ID format or not, so we'll do that check, before even
  searching.

  As a result: Now even if the user enters a badly formatted ID string
  on the books/ route, our application handles it and makes sure
  we don't do a database query. We just send back json saying their
  document ID was invalid.



+ Handling case where ID for document wasn't found.

*/
app.get("/books/:id", (request, response) => {
	// Checks if string id is valid
	if (ObjectId.isValid(request.params.id)) {
		db.collection("newBooks")
			.findOne({
				_id: new ObjectId(request.params.id),
			})
			.then((document) => {
				response.status(200).json(document);
			})
			.catch((error) => {
				response.status(500).json({ error: "Could not fetch the document" });
			});
	} else {
		// If ID the user entered isn't valid, we send back an error response
		response.status(500).json({ error: "Not a valid document ID" });
	}
});

/*
+ Making a post request: 
- So with a POST request, we're sending in data that we want to save to a database
  and we put that data in the body of a request.
1. Sending a post request to '/books' route
2. Get the json of the book we want to add from the body of 
  the request. Just assume the body of the request just has the JSON.

NOTE: Remember GET requests are usually triggered through going to 
  that endpoint or route. This is the common way it happens. But POST
  requests are more complex, as these usually trigger through the use
  of forms or other means. So that's how you can differentiate them
  despite them working with the same '/books' route.
*/
app.post("/books", (request, response) => {
	const book = request.body;

	db.collection("newBooks")
		.insertOne(book)
		.then((result) => {
			response.status(201).json(result);
		})
		.catch((error) => {
			response.status(500).json({ error: "Could not create a new document" });
		});
});
