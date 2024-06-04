const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
    const { name, email, password, dateOfBirth } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(400).json({ message: "An account with this email already exists! Please use a different email!" });
        return;
    }

    // Email is unique, so hash the password and create the user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: passwordHash,
        dateOfBirth
    });
    res.status(200).json(user);
});

router.post("/signin", (req, res) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // Check if the email correlates to any user; if not, return the error message
    if (!existingUser) { 
        res.status(400).json({ message: "Email or password is incorrect!" });
        return;
    }

    // Verify the password; If the password entered is incorrect, then return an error message
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        res.status(400).json({ message: "Email or password is incorrect!" });
        return;
    }


    // At this point the login is successful
    res.status(200).json({
        message: "Login successful",
        user: existingUser
    })

})

module.exports = router;