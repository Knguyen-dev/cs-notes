/*
+ Middleware for verifying access token and protecting routes:
- So if a request contains our valid jwt token, then we allow them into 
  the route. Else, we will stop the request here and send back json saying that they aren't 
  allowed.
*/

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	// Check if the request has defined the authorization header
	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required!" });
	}

	// 'authorization' is a string that looks like this: "Bearer <access_token>"
	// So split the spring and get the access token via indexing.
	const token = authorization.split(" ")[1];

	/*
  + Verifying the access token, we defined the payload of our token in 'userController'
	1. Destructure the payload to get the id of the user. Now we have the ID of the 
    user that we're making this request for.
  2. Create the 'user' property on the request. We assign it to the 'user id' of 
    the user we find in the database.


  - NOTE: The reason we go out of the way to do a database query to assign the 
    ID instead of outright using the _id we found on the jwt is to confirm the 
    user still exists in the database. The possibility does exist for when a 
    user gets an access token, and then deletes their account. That access 
    token is still valid even though the account is deleted. By doing this, 
    we make sure that only jwts on existing users will work.

  3. Go to the next middleware.
  */
	try {
		const { _id } = jwt.verify(token, process.env.SECRET);

		const user = await User.findById(_id);

		// This means the user with that token no longer exists in our database
		if (!user) {
			res.status(401).json({ error: "Request not authorized" });
		}

		req.user = user.id;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: "Request is not authorized" });
	}
};

module.exports = requireAuth;
