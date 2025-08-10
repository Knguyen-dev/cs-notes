var express = require("express");
var router = express.Router();

/* 
+ GET home page: We're saying our home page or actual index is the "/catalog"
  in this case. So when the user is on the index path, redirect them to the 
  '/catalog' route.


*/
router.get("/", function (req, res, next) {
	res.redirect("/catalog");
});

module.exports = router;
