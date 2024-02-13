const express = require("express")
const router = express.Router()
const employeesController = require("../../controllers/employeesController")
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")

/*
- Just an api for the employees. Getting, updating, creating, or deleting employees.
  Notice how they used verifyRoles, so you have to have certain roles for some endpoints 
  to work.
*/

router
    .route("/")
    .get(employeesController.getAllEmployees)

    // Verifies
    .post(
        verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
        employeesController.createNewEmployee
    )
    .put(
        verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
        employeesController.updateEmployee
    )
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee)

router.route("/:id").get(employeesController.getEmployee)

module.exports = router
