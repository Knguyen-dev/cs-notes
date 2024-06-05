require("dotenv").config();

// Require our mongodb file
require("./src/config/db");

const app = require("express")();
const AuthRouter = require("./src/routes/AuthRouter");

const port = 3000;

// Bodyparser
const bodyParser = require("express").json;
app.use(bodyParser());

app.use("/auth", AuthRouter);

// Error handler
app.use(function (err, req, res, next) {
	res.status(500).json({ message: err.message });
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
