import PropTypes from "prop-types";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

export default function WorkoutDetails({ workout }) {
	const { dispatch } = useWorkoutsContext();

	/*
  + Handling deleting a workout:
  1. Send a DELETE request to our delete endpoint. Indicate the ID that's being
    deleted.
  2. Get the JSON data of the response. If it was a good response then Mongoose
    will hand us back the workout we deleted. 

  3. We delete the workout in the database, and we will also delete the workout 
    from our global state value, so that the database and context remain in sync!
  */
	const handleClick = async () => {
		const response = await fetch(
			"http://localhost:3000/api/workouts/" + workout._id,
			{
				method: "DELETE",
			}
		);
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: json });
		}
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong> {workout.load}
			</p>
			<p>
				<strong>Reps: </strong>
				{workout.reps}
			</p>
			<p>{workout.createdAt}</p>

			<span onClick={handleClick}>Delete</span>
		</div>
	);
}

WorkoutDetails.propTypes = {
	workout: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		load: PropTypes.number,
		reps: PropTypes.number,
		createdAt: PropTypes.string,
	}),
};
