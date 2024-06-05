require("dotenv").config();

// Require our mongodb file
require("./src/config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const AuthRouter = require("./src/routes/AuthRouter");


const port = 3000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());  // json from request body
app.use(express.urlencoded({ extended: true })); // json from forms



app.use("/auth", AuthRouter);


// Error handler
app.use(function (err, req, res, next) {
	res.status(500).json({ message: err.message });
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
