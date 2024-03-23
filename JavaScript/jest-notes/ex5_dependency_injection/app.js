const express = require("express");

/*
+ ISSUE: You want to have a separate 'fake' database and 
  your production database, however right now 'App' is importing
  the same database from our database file. 

+ SOLUTION: Wrap our app in a function, where we can pass the database
  to it rather than let app import the database. As a result 
  we can choose when we want to pass in the real or fake databases
  Now we have a function that creates our app, but needs to be passed in 
  an argument for the database.
*/

module.exports = (database) => {
	const app = express();
	app.use(express.json());

	app.post("/users", async (req, res) => {
		const { username, password } = req.body;

		try {
			// Check if user with username is already taken
			const user = await database.getUser(username);
			if (rows.length > 0) {
				return res.status(400).send({ error: "Username already taken" });
			}

			// Of course, send back the userId; a continuation of previous example
			const userId = await database.createUser(username, password);
			res.send({ userId });
		} catch (err) {
			return res.sendStatus(500);
		}
	});

	// Return the express app at the end.
	return app;
};
