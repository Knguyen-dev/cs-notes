/*
- With jwt, we can logout without sending a request to the backend. The only thing keeping 
  us logged in is the global state, and the jwt in local storage. How to log out:
  1. Update global state to indicate you're logged out
  2. Delete jwt in local storage. Without that jwt, the request won't pass our backend's 
  checks.

  3. We also need to update the workouts context state so that whenever we log out 
    the array of workouts is cleared and becomes null again. Right now when we log
    out and log in to another account, the previous account's workouts will be rendered
    by our home page because we didn't clear them. They'll be rendered for about a second
    before the current user's workouts are fetched and rendered, which is annoying. To
    prevent this flicking, we simply have to make it so everything we log out, we clear that global
    state value for workouts.
    
*/

import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

export default function useLogout() {
	/*
  - Both dispatch functions are returned as dispatch. So to get 
    around this you can destructure 'dispatch' as 'workoutsDispatch'.
    Just a little review of destructuring in JavaScript really.
  
  */
	const { dispatch } = useAuthContext();
	const { dispatch: workoutsDispatch } = useWorkoutsContext();

	const logout = () => {
		// remove user from storage {email, token}
		localStorage.removeItem("user");

		// Change the global context, which sets user to null and indicates we're logged out
		dispatch({ type: "LOGOUT" });

		// Set the workouts to null
		workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
	};

	return logout;
}
