/*
- Rather than making the user wait until their  
  refresh token expires to logout, we'll allow the user 
  to logout on the front end.


*/

import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useLogout() {
	const { setAuth } = useAuth();

	const logout = async () => {
		setAuth({}); // wipe the current auth

		try {
			// eslint-disable-next-line no-unused-vars
			const response = await axios("/logout", {
				withCredentials: true, // send that secure cookie back
			});
		} catch (err) {
			console.error(err);
		}
	};

	return logout;
}
