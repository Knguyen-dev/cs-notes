const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: String,
})

const model = mongoose.model("User");
module.exports = model;