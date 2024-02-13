const express = require("express")
const router = express.Router()
const usersController = require("../../controllers/usersController")
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")

// Simple api for the users, again had to have certain roles to access certain routes

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), usersController.getUser)

module.exports = router
