const { createLogger, format, transports } = require("winston");
const logger = createLogger({
	/*
    + Transports: The places we want to save our logs
    1. transports.Console(): Logging by Console.logging. Here we didn't specify any configurations
      so it's just going to log any of the http responses to the console.

    2. transports.File: Here we're storing our logs in a file. We specify the level 'warn'. So
      our middleware still store logs with a severity level greater than or equal to warning into a 
      file called 'logsWarning.log'. 

    3. transports.MongoDB: 
    */
	transports: [
		new transports.Console(),

		new transports.File({
			level: "warn",
			filename: "logsWarnings.log",
		}),
		new transports.File({
			level: "error",
			filename: "logsErrors.log",
		}),

		new transports.MongoDB({
			db: process.env.MONGO_URI,
			collection: "logging-ex",
		}),
	],

	/*
    + Format : The format of our log messages
    - .json: Format our log message in JSON format. Giving us all of the info about a request. Note that 
      you can definitely control or change the default json contents.
    - .timestamp(): Adds the timestamp object in the logged json, which will be an ISO date string, in utc format,
      of when the request was sent.
    - metadata(): include metadata in the json

    Then we can just fomrat.combine to combine our formats. So let's combine the json format with prettyPrint
    which is just a configuration that makes the output look nice. As a result we'll get nice looking JSON
    output being logged
    */
	format: format.combine(
		format.json(),
		format.timestamp(),
		format.metadata(),
		format.prettyPrint()
	),

	/*
    - if true, it'll configure our logger to map specific HTTP status codes to certain log levels, and 
    as a result, when we send back those status codes, we save the logs to the requests accordingly

    Client errors (4xx) maps to 'warn' 
    Server errors (5xx) maps to 'error'

    and so on. But as a result, depending on the status code we give the user, we can then save that 
    to a particular log file. That's what we wanted.

    - NOTE: statusLevels is apart of express-winston, so we'll add it back once we've imported express-winston!
    */
	// statusLevels: true,
});

module.exports = logger;
