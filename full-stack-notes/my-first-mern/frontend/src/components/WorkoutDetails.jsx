import PropTypes from "prop-types";

export default function WorkoutDetails({ workout }) {
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
		</div>
	);
}

WorkoutDetails.propTypes = {
	workout: PropTypes.shape({
		title: PropTypes.string,
		load: PropTypes.number,
		reps: PropTypes.number,
		createdAt: PropTypes.string,
	}),
};
