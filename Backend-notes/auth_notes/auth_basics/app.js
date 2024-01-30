const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// My imports
const connectToDb = require("./db");
const User = require("./models/user");

connectToDb();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*

1. Adds express-session middleware to your application
- secret: String used to sign the session ID cookie to help prevent tempering.
  Our 'value 'cats' is the secret key, and in an ideal scenario you'd use a longer,
  more randomly generated string for better security.
- resave: Whether or not the session should be saved back to the session store even 
  if it wasn't modified during the request. It's set to false to prevent unnecessary 
  session updates.
- saveUninitialized: Determines whether a session should be saved if it's new but 
  hasn't been mofidied. Setting it to true ensures that new sessions are saved, even 
  if they haven't been modified during the request.
2. Initializes passportJS and adds its middleware to your application
3. This last middleware enables session support for Passport. 

- NOTE: 'express-session' is one of Passport.js's dependencies, rather than
  something we directly work with.

*/
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

/*
+ Setting up LocalStategy authentication:
- This middleware function is run when we use passport.authenticate().
  It's given a username and password, and a done function that some other 
  package adds in. Its purpose is to authenticate and log the user in.
1. Finds user with that username. If no user is found, we 
  end it early and tell the user the username was wrong.
2. If user was found, we check if the passwords match.
  If we pass both of those checks, then we authenticate the 
  user and move on.
- NOTE: Passport middleware assigns our 'user' property
  in our request object on success.
*/
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });

			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}

			/*
      + Compare the password the user inputted to the hashed password stored
        in the database:
      
      1. password here would be what the user typed in, whilst user.password
        would be the already encrypted/hashed password. Here obviously bcrypt
        handles hashing 'password' to see if it actually matches its hashed counterpart
      
      */
			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

/*
+ Setting up sessions and serlization:
- To ensure that a user stays logged in, passport uses data to create
  a cookie to store in the user's browser. Here we'll define the info 
  passport uses/looks for when creating/decoding the cookie. 

1. Here we're using the user's id to create a cookie. 
2. Then we're going to decode teh cookie with the same 
  user id

*/
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

/*
+ Handy middleware for users:
- Remember we use middleware to do things, such as modify the request or 
  response object. Here we'll use middleware to create a property 
  currentUser in our response object, and this will just be a reference 
  to the 'req.user' that passport made. As a result, we don't have to
  pass 'user' into our locals everytime because it's already there!

- NOTE: Remember the order of middleware matters. We put this 
  after the passport middleware and before our routing middleware
  so our stack is in this order: 
  passport (creates req.user) => custom (creates res.locals.currentUser) => router that renders views.


*/
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// Routes
/*
+ Index route:
1. Passport middleware checks to see if there's a user logged in
  by checking the cookies that come with the request object. If there
  is a user, it adds ".user" property onto the request object. 
2. As a result, we only need to check req.user to get a user object
  and change our page depending whether or not a user is logged in.





*/
app.get("/", (req, res) => {
	// Don't need this part if you have the middleware that does res.locals.currentUser
	// res.render("index", {
	// 	user: req.user,
	// });
	res.render("index");
});

app.get("/sign-up", (req, res) => {
	res.render("sign-up-form");
});

/*
+ Handling for sign up page: Creates user, saves them to the database, and 
  redirects back to the index page.



- NOTE: 
  1. Typically we store salts in the database as salts are usually randomly
  generated when hashing user passwords. We'd then retrieve the salt from the database
  when we're seeing if a user's input password is hashed to the hashed password already
  stored in the database. However, when using bcrypt.hash() to hash passwords, bcrypt 
  automatically includes the salt in the hashed password, so you don't have to store 
  it in a database. So main takeaway, don't worry about storing salts in your database,
  the main thing you'll be doing is storing the hashed password in your database.
  
  2. We pass in the argument '10', which is not the salt itself, but
  the number of hashing iterations used to create the salt. 

  3. You could also do this without async/await by passing in a callback function
    or using promise syntax:

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // Store user in db
  })

  bcrypt.hash(password, saltRounds).then((hash) => {
    // store user in db
  })



*/
app.post("/sign-up", async (req, res, next) => {
	try {
		// Hash the password with bcrypt
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const user = new User({
			username: req.body.username,
			password: hashedPassword,
		});
		const result = await user.save();
		res.redirect("/");
	} catch (err) {
		return next(err);
	}
});

app.get("/log-in", (req, res) => {
	res.render("log-in-form");
});

/*
+ Route for logging in users:
- Just call passport.authenticate(), which will run your authentication
  function that use set up earlier. It does a lot of other things behind 
  the scenes. 
  
1. Gets 'username' and 'password' parameter sfrom the 
  request body.
2. If good, it creates a session cookie that'll be stored in the 
  user's browser. We'll then be able to access the cookie in all future requests
  to see if they're logged in or not.
3. Based on whether or not the user was successfully authenticated for the login, 
  we can redirect them. So here, we redirect them to the index page when successful, 
  or reload the login page when failed

*/
app.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/log-in",
	})
);

/*
+ Route for logging out users:





*/
app.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
	});
});

app.listen(process.env.port, () =>
	console.log(`App listening on port ${process.env.port}`)
);
