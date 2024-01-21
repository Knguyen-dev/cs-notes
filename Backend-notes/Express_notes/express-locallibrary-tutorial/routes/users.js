var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
	res.send("respond with a resource");
});

/*
+ Created a cool route.
*/
router.get("/cool", (req, res) => {
	res.send("Cool what a coincidence!");
});

module.exports = router;
