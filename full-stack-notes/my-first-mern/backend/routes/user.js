const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Login route
router.post("/login", userController.loginUser);

// Sign up route
router.post("/signup", userController.signupUser);

module.exports = router;
