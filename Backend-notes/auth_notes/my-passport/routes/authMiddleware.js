module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};

/*
+ isAdmin: Just a little creative, but it just checks whether you're an authenticated
  user and an admin. So if you're an admin, so on ahead to whatever route you're 
  supposed to go on, else you're getting an error message. 

- So for our users, only the ones with property admin: true, are able to access
  the admin protected route.

- NOTE: Remember, req.isAuthenticated() has to be true in order for 
  req.user to exist!
*/
module.exports.isAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		next();
	} else {
		res.status(401).json({
			msg: "You aren't authorized to view the page since it's an admin page only!",
		});
	}
};
