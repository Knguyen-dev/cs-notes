/*
+ How to get data from the back end to the front end:
1. Set a state value so we can store the fetched data
  in our component.
2. Use an effect, in this effect we fetch our data from
  our server. Our express server is on localhost 3000 and 
  we want '/api/workouts' endpoint, so hit it.


- NOTE:
1. You need to have both the react and the express application running at the
  same time in order for them to communicate with each other. So have two terminals
  running their respective applications.
2. CORS Warning: When trying this for the first time, it won't work because your frontend 
  react applicaton is running on a different origin (location) than your express application.

+ Reviewing CORS (Cross-Origin Resource Sharing):
- Why it happens: Browsers have builtin security called Same-Origin
  policy (SOP), which restricts websites from making requests to 
  other domains. So a website can make a requests to one of its own servers,
  but not a server of another. This is just a default setting that blocks
  requests for security reasons. In this case, the browser blocked the 
  react app's request.

- CORS (Cross-Origin Resource Sharing): CORS allows servers to
  specify which origins (other websites), have permission to access
  its resources. Basically it's just some HTTP headers shared between
  the client and server to determine if the reqeuest is allowed. So
  the server must include specific CORS headers in its response to 
  indicate which origins are allowed to access its resource.

+ Solution: In our backend we do this
1. npm install cors
2. Require and use the middleware for the routes we want to 
  allow cross origin requests on. In this case, we will 
  put it above all other routes to allow CORS on all of our 
  routes/requests.



*/

import { useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

export default function Home() {
	// Destructure our object and gain the workouts array and dispatch function
	const { workouts, dispatch } = useWorkoutsContext();

	/*
  + Fetches an array of workouts:
  1. At our express endpoint, we send back an array of workout objects
    in json format.
  2. Here we take the json from the http response, and then parse the json
    to get us our original array of documents back.


  + When form submits and refetching data:
  - Situation: When we submit our form to add the new workout, we want to 
    see that new workout get rendered. However the issue is that, submitting
    a form isn't going to re-run the effect and fetch us the data. So deleting
    adding, editing, etc. it will happen in the database, but it's not showing until
    we actually refresh the page.

  - Solution: Instead of fetching the data everytime the form submits just
    to render a new document, we'll use state and context to locally show 
    the user their new workout on the screen. This is a neat solution
    as we'll be able to show the most up to date data, without actually
    having to fetch from the database. Then of course when the user refreshes,
    the effect will populate the state with the most up to date data.
    Let's move on to our WorkoutContext file.
  */
	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("http://localhost:3000/api/workouts");
			const json = await response.json();
			if (response.ok) {
				/*
        - Set the state of the workouts with our dispatch function. Here 
          we just set the workouts and assign the payload as the 
          json, which will be an array of workout objects.
        */
				dispatch({ type: "SET_WORKOUTS", payload: json });
			}
		};
		fetchWorkouts();
		// So whenever dispatch function changes, we re-run the useeffect function, however
		// The dispatch function isn't going to change, so this is doesn't really change anything
	}, [dispatch]);

	return (
		<div className="home">
			<div className="workouts">
				{/* Render workouts when they've loaded */}
				{workouts &&
					workouts.map((workout) => {
						return <WorkoutDetails key={workout._id} workout={workout} />;
					})}
			</div>
			<WorkoutForm />
		</div>
	);
}
