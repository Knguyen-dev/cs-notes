const router = require("express").Router();
const workoutController = require("../controllers/workoutController");

router
	.route("/")
	.get(workoutController.getWorkouts)
	.post(workoutController.createWorkout);

/*
+ Route handling for the '/:id' route.

*/
router
	.route("/:id")
	.get(workoutController.getWorkout)
	.delete(workoutController.deleteWorkout)
	.patch(workoutController.updateWorkout);

module.exports = router;
