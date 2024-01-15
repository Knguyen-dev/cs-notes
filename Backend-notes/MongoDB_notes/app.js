// Import express
const express = require("express");

/*
+ Initializing app & middle ware.
1. To initialize express, just call the require for express

*/
const app = express();
app.listen(3000, () => {
	console.log("App listening on port 3000");
});

/*
+ Routes and handling routes

*/

app.get("/books", (request, response) => {
	response.json({
		msg: "Welcome to the api",
	});
});
