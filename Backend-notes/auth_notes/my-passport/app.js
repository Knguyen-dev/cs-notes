const express = require("express");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// My imports
const routes = require("./routes");
const connection = require("./config/database");

// Connect to .env file
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
+ Session storage setup:
1. Create the session store. We want our express app to store the sessions
  in a collection called 'sessions' in the database we defined with mongoUrl.
  As well as this, it signs the cookie, or hashes the session ID created by
  express-sessions with 'secret' value. So everytime we get a request with 
  a sessionID, we look in our 'sessions' collection for that document.
2. Include our custom session middleware. As a result, everytime the user
  makes a request, if the has a cookie that contains a sessionID, 
  we can take it and look it up in our database.

*/
const sessionStore = MongoStore.create({
	mongoUrl: process.env.url,
	collectionName: "sessions",
});

/*
- Set up session middleware. On request, creates a session for the user, so the user 
  is associated with a session regardless of whether they're logged in or not.
  You'll notice we'll now have a session property on every req object. This is 
  because we take the sessionID, which becomes it's objectid in the 
  'sessions' collection, from the request object's cookies, we look up
  that session in the database. If it valid good everythings fine, and we 
  can do stuff with that session.

1. User makes a request, assume they already have a cookie with a sessionID.
2. Our server sees that session id in the request, looks up that id in the 
  'sessions' collection. It finds a corresponding session with that id.
3. Now we're able to manipulate data, as the 'session' property is 
  set on our request object. We can change its properties such as 
  req.session.viewCount += 1 or something, so we can implement that 
  on the 'index' route handler. So everytime they visit the index page
  the session's viewCount property is increased, and that is automatically 
  saved to the 'sessions' collection.


  req.session.viewCount += 1; 
*/
app.use(
	session({
		secret: process.env.secret,
		store: sessionStore, // save sessions to the database
		saveUninitialized: true, // save session to the database even if there's no data
		resave: false, // save session to the database, even if the data hasn't changed.
		cookie: {
			// Cookie expires after one day.
			// NOTE: Tihs doesn't automatically remove expired sessions from the collection
			// In the real world, a script would probably run to clear the collection frequently.
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);

/*
+ More middlepware for initializing passport
1. When you require a JavaScript file, it executes the code within that file. So
  here when we require our passport.js file, we execute its contents. So there
  we do things such as initializing passport and adding middleware.
2. There we add our middleware that initializes passport middleware and lets passportjs 
  work with sessions. The former makes it so everytime there's a new route/request we 
  refresh passport. This helps ensure the session is fresh and passport has the most
  up to date info about the session. So in the case where a session is expired, passport
  knows to reauthenticate the user. The latter has to do more with express-session, and 
  gives us access to the request.session object inside our routes, and anything stored
  inside that session object is persisted in our database since we have that mongo-connect
  session store thing.

+ Now on every single route request: We check if the passport: {user: userID} is 
  null, which means the user is not authenticated, and so req.user is not populated. So both of these 
  middlewares help with that. This is the code that happens everytime: 

  if req.session.passport.user !== null, then req.user = user from database

*/
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

/*
+ Serialization functions explained:
+ Before authenticating:
- Session {
  cookie: {
    _expires: ...,
    ... more properties about the cookie,
  }
  undefined; indicating req.user object is undefined
}

+ After running passport.authenticate:
1. passport.authenticate function and verification function are run.
2. After our verification function, the user object is passed
  to the serialization function, and that is executed.

3. The serialization function takes the user is 
  responsible for setting user property to the value
  of user.id, which is evident here.
- Session {
  cookie: {
    _expires: ...,
    ... more properties about the cookie,
  }
  passport: {user: userID}
}

+ Then deserialize:
1. For subsequent requests, for req.user to work, we utilize
  that {user: userID}. Our deserialize function takes the userID value,
  and returns a user for us to use.

- Just middleware to print out the session and user for every
  request.
*/
app.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
});

/*
+ Routes
*/
app.use(routes);

app.listen(process.env.port);
