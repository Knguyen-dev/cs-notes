import express from "express";
import setupUserController from "./users.js";

// setup express
const app = express();
const port = 3000;

// setup base route that returns hello world
app.get("/", (req, res) => {
	const responseMessage = "Hello World!";

	res.send(responseMessage);
});

// setup controllers
setupUserController(app);

// start express
app.listen(port, () => {
	console.log(`App listening on port: ${port}`);
});
