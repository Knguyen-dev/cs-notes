/*
+ Handling errors:
- Errors are handled by one or more special middleware functions that have 
  four arguments (err, req, res, next). They can return any content, but 
  must be called after all other app.use() middleware and route handlers.
  This is because we want them to be the last middleware in the request
  handling process.

- NOTE:
1. Remember HTTP 404 and other error status codes aren't treated
  as errors. So you'll have to add in your own middleware logic to handle 
  these errors.
2. Stack trace isn't included in the production environment, so
  to enable it have NODE_ENV="production" in your .env file.

*/

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
