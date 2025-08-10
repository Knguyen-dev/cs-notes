/*
+ One last thing about the next() function


*/

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Home Page");
});

app.get("/users", auth, (req, res) => {
	res.send("Users Page");
});

function logger(req, res, next) {
	console.log(`Original URL: ${req.originalUrl}`);
	next();
}

/*
+ Next is not a return statement

- if true:
1. Create admin property on request object and set to true
2. Call execution of next middleware function.
3. The next middleware function is that .get("/users") route 
  handler. Which will send a http response. Then 
  once we finish executing our next function, we come back
  to our auth function.
4. We need to put a return statement to exit the auth function
  at this point. We already sent an http response in our get route 
  handler and sending another one would cause an error. So
  we use a return statement to exit our auth function after 
  our next() function is done.




*/
function auth(req, res, next) {
	if (req.query.admin === "true") {
		req.admin = true;
		next();
		return;
	}
	res.send("No auth");
}

app.listen(port, () => {
	console.log(`Started listening at port ${port}`);
});
