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

app.get("/api/posts", verifyToken, (req, res) => {
	// Get all of the posts that the user has posted
	const userPosts = posts.filter((post) => post.username === req.user.username);

	// Return those posts as json
	res.json(req.user);
});

function verifyToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		res.sendStatus(401);
	}
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}

app.listen(process.env.PORT, () => {
	console.log(`New App listening on port ${process.env.PORT}`);
});
