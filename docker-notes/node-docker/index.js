const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Hi there from the moon!!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});
