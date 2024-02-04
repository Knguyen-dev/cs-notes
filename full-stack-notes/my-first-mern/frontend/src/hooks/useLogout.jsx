/*
- With jwt, we can logout without sending a request to the backend. The only thing keeping 
  us logged in is the global state, and the jwt in local storage. How to log out:
  1. Update global state to indicate you're logged out
  2. Delete jwt in local storage. Without that jwt, the request won't pass our backend's 
  checks.
*/

import useAuthContext from "./useAuthContext";

export default function useLogout() {
	const { dispatch } = useAuthContext();

	const logout = () => {
		// remove user from storage {email, token}
		localStorage.removeItem("user");

		// Change the global context, which sets user to null and indicates we're logged out
		dispatch({ type: "LOGOUT" });
	};

	return logout;
}
