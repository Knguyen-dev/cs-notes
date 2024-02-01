require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutsRouter = require("./routes/workouts");
const app = express();

/*
- Allows us to access json or form data in the body
  of request objects.
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
+ Enable CORS for all requests. Now our front-end can access our resources

- NOTE: During deployment, you'll probably whitelist only the react-app's origin,
  but during development you're probably fine.
*/
app.use(cors());

// Our custom request logging middleware
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

/*
+ Create our routes.
- Workout routes: Since our express app is an api, we should prefix the routes 
  with something to indicate that.


*/
app.use("/api/workouts", workoutsRouter);

// Connect to database and listen for requests
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Connected to DB & listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
