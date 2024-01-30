require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const app = express();

const initializePassport = require("./passport-config");
initializePassport(
	passport,
	(email) => users.find((user) => user.email === email),
	(id) => users.find((user) => user.id === id)
);
/*
+ Array of users, that'll act as our database. We'll use this
  since we're focusing more on the authentication rather 
  than connecting to a databaese.
*/
const users = [];

app.set("view engines", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
	session({
		secret: process.env.session_secret,
		// Should we resave session variables if nothing has changed? no
		resave: false,
		// Do you want to save an empty value in a session? no
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Have a protected route, run middlware to see if they're authenticated first.
// If not, redirect user to the login page.
app.get("/", checkAuthenticated, (req, res) => {
	res.render("index");
});

/*
+ If already authenticated redirect user to the home page rather 
  than actually taking htem to the login page

*/
app.get("/login", checkNotAuthenticated, (req, res) => {
	res.render("login");
});

// Call passport authentication when logging in
app.post(
	"/login",
	checkNotAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

/*
+ Like a protected route, again if they're already authenticated,
  then rather than taking them to the 'register' page, we'll
  just redirect them to the home page
*/
app.get("/register", checkNotAuthenticated, (req, res) => {
	res.render("register");
});

/*
+ If they're already authenticated, and they're trying to register, 
  rather than saving the user to the database, we'll just redirect
  the user to their home page instead
*/
app.post("/register", checkNotAuthenticated, async (req, res) => {
	try {
		// Hash the password and create the user, and redirect to home page
		// 10 salt rounds is a good standard value
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		res.redirect("/");
	} catch (err) {
		res.redirect("/register");
	}
});

// Logging out
app.get("/logout", (req, res) => {
	req.logOut();
	res.redirect("/login");
});

// If the user's authenticated continue, else redirect to login
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}

// If user is authenticated, then redirect to home page
function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.listen(process.env.port);
