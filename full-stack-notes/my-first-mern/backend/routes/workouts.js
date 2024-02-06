const workoutController = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");
const router = require("express").Router();

/*
+ Place our middleware before all of these routes. Placement of middleware matters,
  so whenever any of these routes are triggered, the requireAuth middleware will fire 
  first to check the validity of the jwt token. If there is a jwt token, they're 
  authenticated, or more appropriately they are authorized to access these resources.
*/

// Require auth for all workout routes
router.use(requireAuth);

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
