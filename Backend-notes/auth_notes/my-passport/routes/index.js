const router = require("express").Router();
const passport = require("passport");
const { validatePassword, genPassword } = require("../lib/passwordUtils");
const { connection, User } = require("../config/database");

const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
// Post routes

/*
+ How to include passport middleware:
- In the post request, we include passport's authentication middleware for localstrategy.
  Essentially, before our main route-handler, passport's middleware will run. A lot of stuff
  is done behind the scenes, but this essentially runs the verification callback 
  function that we created as that's our custom method of authenticating.

- Note we don't really need a (req, res) callback function. All we want to do
  is redirect the user after a successful authentication, and passport allows 
  us ot do that easily.
*/

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/login-success",
		failureRedirect: "/login-failure",
	})
);

router.post("/register", (req, res, next) => {
	// const password = req.body.pw;
	// console.log(req.body.pw);
	// return;

	// Expecting password to be in 'pw' field, returned the salt and hashed passwords
	const { salt, hash } = genPassword(req.body.pw);

	// Create our user object
	const user = new User({
		username: req.body.uname,
		hash: hash,
		salt: salt,

		// Let's just say they're an admin
		admin: true,
	});

	// Save the user
	user.save().then((user) => {
		console.log(`User saved with id ${user.id}`);
	});

	// Redirect user to the login route
	res.redirect("/login");
});

/*
+ GET Routes: Very simple as they jsut send markup for different 
pages.
*/

// Home Page
router.get("/", (req, res, next) => {
	res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res, next) => {
	const form =
		'<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

	res.send(form);
});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get("/register", (req, res, next) => {
	const form =
		'<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

	res.send(form);
});

/*
+ Our different pages:
*/

router.get("/protected-route", isAuth, (req, res, next) => {
	/*

  - isAuth: we put this in front of our middleware stack to protect routes
    we want to protect. Now if the user is authenticated, we move on to the next 
    middleware which is the (req, res, next) function we made here and render the page or whatnot,
    however if they aren't then we redirect them to the login page!

  + This is how you check if a user is authenticated and protect a route.  
    Of course we could turn this into middleware to make it better, such that
    it immediately redirects the user if they aren't authenticated.
  
  - NOTE: Passport provides methods such as .isAuthenticated() when you
    did passport.initalize()

  1. req.isAuthenticated(): Checks if user is authenticated. It works 
    by checking whether the req.session.passport.user property exists and 
    isn't null.
  2. req.user: User object, which is only populated when req.session.passport.user
    property exists with a user id.
  3. req.logout(): Logs the user out by terminating their login 'session'. 
    We also related cookies as well. Essentially deletes the 
    req.session.passport.user property from the session object, and so 
    next time we call the passport.initialize() and passport.session() which 
    sees the user is logged out because the .user property is not there.

  4. req.login(): initializes a session for the user and stores their 
    infomration in a session store. We give the user a cookie to 
    identify them on subsequent requests. The serialization part just means 
    we convert the user's data into a format that can be stored on the 
    session, keeping it small and manageable.

  - Remember sessions are often associated with authentication. If you're not 
    logged in, you may still have cookies, but there's no session and session id
    to identify you with. You're anonymous. However after logging in, the server
    gives you a sessionID (in the form of a cookie), and now on subsequent requests
    knows who you are.


  */

	res.send(
		"<h1>Hi you're at the protected route  <a href='/logout'>Logout</a></h1>"
	);
});

router.get("/admin-route", isAdmin, (req, res, next) => {
	// This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
	res.send("You made it to the admin route");
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/login");
	});
});

router.get("/login-success", (req, res, next) => {
	res.send(
		'<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
	);
});

router.get("/login-failure", (req, res, next) => {
	res.send("You entered the wrong password.");
});

module.exports = router;
