import { useState } from "react";

export default function WorkoutForm() {
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");

	const [error, setError] = useState(null);

	/*
  + Handle form submission: Remember, we handle our form submission in react, rather than just let 
    the form do the submission.
  
  1. Get the current workout via state values. This creates {title: someTitle, load: someLoad, reps: someReps}
  2. Create a POST request with the fetch api. Convert the workout object
    we created into json and put it in the body of the request. Specify in the headers
    of the POST request that we are sending JSON.
  3. Now the server will respond, sending back data that indicates the results of the POST request.
    Check if the response status was good. Our server sends back status codes, which allows us to 
    check this! If the server gave a bad response, we set the error to json.error which we know is 
    our error message we created on the server.

  - try/catch: Handles any errors when trying to connect to our express server. For example if the 
    server's down it'll catch that error. Or if the server itself sends an error, we will catch
    and display it. For the former, you see the error message we set in handleSubmit's try/catch, but
    the latter's error messages are sent through the server. 

  - Error messages: We purposely left out 'required' to see the error messages for our server
    side validation. However these error messages such as "Workout validation failed: load: Path 'load is required'"
    doesn't make sense to users. 
  */
	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = { title, load, reps }; // current workout

		try {
			const response = await fetch("http://localhost:3000/api/workouts", {
				method: "POST",
				body: JSON.stringify(workout),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const json = await response.json();

			if (!response.ok) {
				setError(json.error);
			} else {
				setTitle("");
				setLoad("");
				setReps("");
				setError(null);
			}
		} catch (err) {
			setError("Something went wrong. Please try again later!");
			console.error(err);
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout!</h3>

			<label htmlFor="title">Exercise Title:</label>
			<input
				type="text"
				name="title"
				id="title"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>

			<label htmlFor="load">Exercise Load:</label>
			<input
				type="number"
				name="load"
				id="load"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
			/>

			<label htmlFor="reps">Exercise reps:</label>
			<input
				type="number"
				name="reps"
				id="reps"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
			/>

			<button type="submit">Submit</button>

			{error && <div className="error">{error}</div>}
		</form>
	);
}
