require("dotenv").config();

const express = require("express");
const app = express();

const expressWinston = require("express-winston");
const { transports, format } = require("winston");

// Adds on a mongodb tranpsort for winston
require("winston-mongodb");

const logger = require("./logger");

app.use(
	expressWinston.logger({
		winstonInstance: logger,
		statusLevels: true,
	})
);

app.get("/", (req, res) => {
	res.sendStatus(200);
});

app.get("/400", (req, res) => {
	res.sendStatus(400);
});

app.get("/500", (req, res) => {
	res.sendStatus(500);
});

/**
 * Let's create a custom format for our errorLogger. We know that
 * the json object is going to be in form:
 * someLogJSON = {
 *    level,
 *    meta,
 *    timestamp
 * }
 *
 * So we can format it before outputting it to the logInternalErrors.log
 */
const customFormat = format.printf(({ level, meta, timestamp }) => {
	return `${timestamp} ${level}: ${meta.message}`;
});

/**
 * Let's have a logger that's going to give us a good stack trace so that
 *
 */
app.use(
	expressWinston.errorLogger({
		transports: [
			new transport.File({
				filename: "logInternalErrors.log",
			}),
		],
		format: customFormat,
	})
);

app.listen(3000);
