const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// On load of db, populate it with sample data if it's empty
db.once("open", async () => {
	if ((await User.countDocuments()) > 0) {
		return;
	}

	await Promise.all([
		User.create({ name: "User 1" }),
		User.create({ name: "User 2" }),
		User.create({ name: "User 3" }),
		User.create({ name: "User 4" }),
		User.create({ name: "User 5" }),
		User.create({ name: "User 6" }),
		User.create({ name: "User 7" }),
		User.create({ name: "User 8" }),
		User.create({ name: "User 9" }),
		User.create({ name: "User 10" }),
		User.create({ name: "User 11" }),
		User.create({ name: "User 12" }),
	]);
});

const app = express();

app.get("/users", paginatedResults, (req, res) => {
	return res.status(200).json(res.paginatedResults);
});

async function paginatedResults(model) {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		// Indexes
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		// Create 'prev' and 'next' objects
		if (endIndex < (await model.countDocuments())) {
			// If so, we know
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}

		if (startIndex > 0) {
			// if so, then we know at minimum the previous index is 0, or page 1.
			results.prev = {
				page: page - 1,
				limit: limit,
			};
		}

		const results = {};

		/*
    + Limit and skip: Methods designed for pagination. 
    1. limit: Specifies the maximum number of documents to return.
    2. skip: Specifies number of docuemnts to skip.
    */
		results[model] = await model.find().limit(limit).skip(startIndex);

		// Store the results inside our response variable and call next()
		res.paginatedResults = results;
		next();
	};
}

app.listen(3000, () => {
	console.log("server started");
});
