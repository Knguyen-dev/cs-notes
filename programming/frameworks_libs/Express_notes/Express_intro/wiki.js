/*

*/

const express = require("express");
const wikiRouter = express.Router();

wikiRouter.get("/", (req, res) => {
	res.send("Wiki home page");
});

wikiRouter.get("/about", (req, res) => {
	res.send("About this wiki");
});

module.exports = router;
