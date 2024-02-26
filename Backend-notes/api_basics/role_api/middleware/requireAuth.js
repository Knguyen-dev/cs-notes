/*
+ Require authentication middleware: 
- Our first step when protecting the backend is having some middleware 
  that requires that the user is logged in before letting them access any of 
  our protected api routes. So for jwt, this would be like checking if the 
  access token that they provided is valid, or for sessions you're checking 
  if the session that they have is valid!


*/

function requireAuth(req, res, next) {
	if (req.user == null) {
		return res.status(403).json({ message: "You need to sign in first!" });
	}
	next();
}

module.exports = requireAuth;
