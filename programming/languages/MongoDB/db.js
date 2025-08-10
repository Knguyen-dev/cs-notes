/*
+ Here we put our database connection code. We're going to create and export two 
  database related functions


1. connectToDb(callback): A function for initially connecting to a database. We pass a callback
  function that will be called after we connect to the database. It will be fired after a success
  or an error.
2. getDb(): We get that database connection, assuming already initially connected, and return it. Then our main  
  app can start using this to interact with the database.

*/

// Import the MongoClient that allows us to connect to a MongoDB database
const { MongoClient } = require("mongodb");

let dbConnection;

// Exporting the functions in a node application
module.exports = {
	connectToDb: (callback) => {
		MongoClient.connect(process.env.uri)
			.then((client) => {
				dbConnection = client.db("bookstore"); // Define what database we are targeting
				return callback();
			})
			.catch((error) => {
				console.error("MongoDB couldn't connect: ", error);
				return callback(error);
			});
	},
	getDb: () => dbConnection,
};
