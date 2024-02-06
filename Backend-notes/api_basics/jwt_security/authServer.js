require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

/*
+ Now let's create our route for refreshing our access tokens:
- So when we want to refresh our access tokens, we'll send our
  refresh token in as json. So normally refresh tokens are actually 
  stored in some sort of database or 'redis' cache. But here we'll
  create a mock database of an array

1. Check if refresh token exists.
2. Here you'd we're check if that refresh token is
 in our database, and if so, it is valid. So here
 check if it isn't in our list of issued/valid refresh
 tokens. If it isn't then return bad status code.

3. Finally, we'd try to verify the signature of the token to see
  if it was tampered with.

*/

let refreshTokens = [];

app.post("/api/token", (req, res) => {
	const refreshToken = req.body.token;

	/*
  1. Check if refresh token is there.
  2. Verify our refresh token to ensure it hasn't been tampered with. If not we
    are returned the decoded payload.
  3.  Here you'd check in the database if the refresh token exists. If it 
    doesn't exist then that's a 403 error. We store them in the database 
    so that we can remove them, when the user does things such as log out. 
    I mean, at this point we know it's a valid refresh token that hasn't expired yet,
    but if it isn't in the database that means we revoked the token due to certain
    reasons such as the user logging out.

  4. Re-generate our access token. So here we'd just recreate the access token.
    We didn't use 'user' object because that actually contains extra metadata such
    as the 'iat' (issued-at-date), so we just want the username like we did in
    our login route.
  5. Finally send back the new access token as json.
    */
	if (!refreshToken) return res.sendStatus(401);
	try {
		const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
		const accessToken = generateAccessToken({ username: user.username });

		res.json({ accessToken });
	} catch (err) {
		res.sendStatus(403);
	}
});

/*
+ logout: In our logout route, we want to be able to delete that refresh token so 
  it can't just be used forever and ever. Essentially we'd delete it from our database.
  As a result, the user would need to login again to get a new access and refresh token.

*/
app.delete("/logout", (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
});

app.post("/api/login", (req, res) => {
	/* 
  + Access tokens usually lasts in terms of minutes, so a short 
    and typical time would be 10-15, or maybe 30 minutes. Here we're going to set it to 
    15 seconds for demonstration purposes.
  */
	const username = req.body.username;
	const user = { username };

	/*
  1. Create the short lived access token
  2. Create our long lived refresh token
  3. Store our refresh token in a database, in this case our array.
  4. Now we return both the access and refresh token to the client application.
  - NOTE: We don't want to put an expiration date on our refresh tokens, rather we'll handle
    the expiration and management of those tokens ourselves.
  */
	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

	refreshTokens.push(refreshToken);

	res.json({ accessToken, refreshToken });
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(process.env.AUTH_SERVER_PORT, () => {
	console.log(
		`Authentication server listening on port ${process.env.AUTH_SERVER_PORT}`
	);
});
