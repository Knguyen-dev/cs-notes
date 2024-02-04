require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

// Lets us access json in the body of requests.
app.use(express.json());

// Pretend this is our database of posts
const posts = [
	{
		username: "Kyle",
		title: "Post 1",
	},
	{
		username: "Cornell",
		title: "Post 2",
	},
];

app.get("/posts", (req, res) => {
	res.json(posts);
});

app.post("/login", (req, res) => {
	// On this line you'd authenticate the user
	// Pretend to get the username
	const username = req.body.username;
	const user = { name: username };

	/*
  - Here's how the login process with jwt goes:
  1. Create an access token with the user as the payload, and our access token 
    secret key.
  2. Return access token as json. Now 
  */

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

	res.json({ accessToken });
});

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
