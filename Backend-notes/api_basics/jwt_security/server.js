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
	const userPosts = posts.filter((post) => post.username === req.username);

	// Return those posts as json
	res.json(posts);
});

app.post("/api/login", (req, res) => {
	/* 
  - On this line you'd authenticate the user and get the user back.
  */
	const username = req.body.username;
	const user = { username };

	/*
  - Here's how the login process with jwt goes:
  1. Create an access token with the user as the payload, and our access token 
    secret key.
  2. Return access token as json. Now the client app should have a access
    token

  - NOTE: Could also do it asynchronously and pass a callback function:
  jwt.sign(user, 'secretkey', (err, token) => {
    res.json({accessToken})
  })
  */

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

	res.json({ accessToken });
});

/*
+ Verifying a JWT token: We'll create a middleware function to verify that a request has a token in order to secure our routes.
1. When tokens are sent from client to server, they are stored the 'authorization' header. So 
  here we get the 'bearerHeader' or just where the token is held. Remember access tokens, the ones 
  that we're interacting with here to secure the 'access' of the backend, are also called bearer tokens.
  
  This is how the authorization header looks:

  Authorization: Bearer <access_token>

2. If authHeader is defined, we split it since it's a string. We'll split it by space so for 
  the string 'Bearer <access_token', it'll turn into an array ['Bearer', '<access_token'] and we'll
  get the access token via indexing. 
*/

function verifyToken(req, res, next) {
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];

	// If there's no token in the authorization header, send back status code to tell the user isn't authorized.
	if (!token) {
		res.sendStatus(401);
	}

	/* 
  + Now we know there is a token, so we have to verify it. However here is the 
    theory first: 
  
  1. When we log in, the jwt is created. Taking our token's header, payload,
    our secret, and hashing them together to create the signature. Then it's 
    given to the client.

  2. Then when we verify the token by recomputing the signature. He take the 
  header, payload, and secret key and hash it again. If the resulting 
  signature matches the signature on the token that we got, then the token's
  data wasn't changed or tampered with. As a result the server sees the JWT 
  is valid. 

  3. Then you could do things such as checking payload for information such as 
  userID roles, permissions, etc. and based on that info the server can grant
  or deny access to the requested resources/endpoint. Of course here we didn't 
  set an expiration date, but you could definitely set and check the expiration
  date on the token in our jwt.verify function and deny access if its expired.

  - Now back to the actual process:
  3. Verify the access token. We're using the callback way. If an error 
    occurred whilst verifying the token, send a code 403. The 'user' 
    object is just the decoded payload that the jwt has. At this 
    point we know it's a valid user because the JWT hasn't been tampered
    with, so it should have the same user data as it did when we created 
    the jwt.

  4. So now we create a 'user' property on our request object that 
    allows us to access the user in later middleware. Finally
    call next() so that the next middleware in the stack will run.

  - Takeaway: Now we have middleware that verifies a JWT token
    to make sure the client-side app has authorization to said resources.
    We can add this to endpoints that we want to protect.
  */

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
