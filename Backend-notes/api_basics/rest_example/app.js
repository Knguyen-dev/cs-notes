require("dotenv").config();

const express = require("express");

const app = express();

// Of course remember to include this middleware so you can access
// data from the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock database
let users = {
	1: {
		id: "1",
		username: "Robin Wieruch",
	},
	2: {
		id: "2",
		username: "Dave Davids",
	},
};

let messages = {
	1: {
		id: "1",
		text: "Hello World",
		userId: "1",
	},
	2: {
		id: "2",
		text: "By World",
		userId: "2",
	},
};

/*
+ Routes or our api endpoint URIs: 

- "/users": For a list of users, we have a get and a post request. For get
  would be getting back the json of those users, and post request would
  probably be creating a new user. It's typical to only have a 'get' and 'post request 
  for your endpoints that return a list of data. I mean you're probably not going 
  to do a DELETE, or PUT request on all of your items.

- "/users/:userId": We can target a singular item. Here it does make sense to 
  have all four CRUD operations covered with endpoint URIs. You should be able
  to get the item, update the item, delete the item.

- NOTE: Of course we don't show it here, but that message uri could be 
  targeting a post or something. So doing a POST request "/posts/:postId/messages"
  could mean adding a message to a particular post. But here you can see the typical 
  patterns we use
*/

// Get a list of users
app.get("/users", (req, res) => {
	return res.json(Object.values(users));
});

// For creating a single user
app.post("/users", (req, res) => {
	return res.json(Object.values(users));
});

// Get a particular user
app.get("/users/:userId", (req, res) => {
	return res.json(users[req.params.id]);
});

// Update a particular user
app.put("/users/:userId", (req, res) => {
	return res.json({ msg: "Update user" });
});

// Delete a particular user
app.delete("/users/:userId", (req, res) => {
	return res.json({ msg: "Delete user" });
});

// Get a list of messages
app.get("/messages", (req, res) => {
	return res.json(Object.values(messages));
});

// Creating a single message
app.post("/messages", (req, res) => {
	return res.json({ msg: "Create a message" });
});

// Get a particular message
app.get("/messages/:messageId", (req, res) => {
	return res.json(messages[req.params.messageId]);
});

app.put("/messages/:messageId", (req, res) => {
	return res.json({ msg: "Update message" });
});

// Delete a particular message
app.delete("/messages/:messageId", (req, res) => {
	return res.json({ msg: "Delete method on single message " });
});

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
