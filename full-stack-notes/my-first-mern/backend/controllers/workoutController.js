/*

+ NOTE:
1. Controller functions: When your controller functions are asynchronous, it's best 
  practice to wrap a try-catch around them. To avoid repetition we'd usually use
  a package called express-async-handler, which wraps your async functions in 
  a try-catch block, and sends them Express's error handling middleware that you
  and express created. Here you can create a new Error(your_error_message), and 
  assign it a status code. Then create your own error handling middleware 
  that does res.status(err.statusCode).json({err: err.message}). By doing this
  your error handling would be a bit more streamlined. Though this is assuming 
  you want all of your errors to be sent back in JSON, which makes sense in this 
  case since this is an api

2. About Mongoose: Your schemas will have an effect. When posting a new document
  without required fields it will throw an error. If you try to update a field's 
  value to a different data type it will throw an error as well. So this is decent
  behavior

3. Review of status codes: 404 means resource not found, so you entered a good id 
  but it doesn't exist. 400 is a bad request, as it's the client's fault for things
  not working, so like entering a bad id. And then a 500 internal server error meaning
  there's something wrong on the server's end.

4. About express-validator: Using express-validator for server-side validation is 
  good as well. More so for validating the data itself. If our models had restrictions
  and rules, our express-validation functions should validate and sanitize our data 
  accordingly. For example, trimming extra space, ensuring things aren't above or 
  below a range, etc. 

*/

const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getWorkouts = async (req, res) => {
	try {
		/*
    - NOTE: Remember for the find function, when nothing was found it just
      returns an empty array.
      
    - With auth: 
    1. So filter out and find only the workout documents related
      to the user that's making teh request. So here find all workouts 
      that were created by the user.

    
    

    */

		const workouts = await Workout.find({ user_id: req.user }).sort({
			createdAt: -1,
		});
		res.status(200).json(workouts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get single workout
const getWorkout = async (req, res) => {
	try {
		// Check the id's validity
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: "No such workout!" });
		}
		// Fetch workout
		const workout = await Workout.findById(req.params.id);
		// If no workout with id was found
		if (!workout) {
			return res.status(404).json({ error: "No such workout!" });
		}
		// Return as json
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/*
+ Create new workout:

- Try/catch: Handles errors that might occur during creating and saving
  workout to the database. So catches errors if something goes wrong in
  the database operations.
*/
const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body;

	/*
  + Custom error messages: Depending on which fields are empty, we 
  can choose to send back custom error messages. Here's a simple way 
  to do it.


  - NOTE: Mongoose also allows you to have custom error messages, but 
    you'd probably use express validator to check datatypes and schema 
    conditions to help with your error messages and send them 
    back to the user honestly.
  */
	let emptyFields = [];
	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	try {
		// Creates and saves workout to database
		const workout = await Workout.create({
			title,
			load,
			reps,

			// Assign the id of the user making the request
			// NOTE: Remember that in our middleware, we assign req.user to the id value of the user we found
			// Realistically we should have named it req.user_id, but here we are.
			user_id: req.user,
		});

		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Delete a workout
const deleteWorkout = async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: "No such workout!" });
		}
		const workout = await Workout.findByIdAndDelete(req.params.id);
		// If mongoose failed to delete it
		if (!workout) {
			return res.status(404).json({ error: "No such workout" });
		}
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateWorkout = async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ error: "No such workout" });
		}
		const workout = await Workout.findByIdAndUpdate(req.params.id, req.body);
		if (!workout) {
			return res.status(404).json({ error: "No such workout" });
		}
		res.status(200).json(workout);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
