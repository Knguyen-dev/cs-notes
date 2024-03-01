/*
+ Hook for refreshing the access token:


*/

import axios from "../api/axios";
import useAuth from "./useAuth";
export default function useRefreshToken() {
	const { setAuth } = useAuth();

	/*
  - Idea: We will call this function when our initial request
    fails due to having an expired access token. So when we refresh
    we're going to not only set the global state, but return
    the newly gotten access token and retry that original request.
  */
	const refresh = async () => {
		const response = await axios.get("/refresh", {
			withCredentials: true, // needed to send our jwt cookie to the backend
		});
		setAuth(response.data); // update global state

		return response.data.accessToken;
	};

	return refresh;
}
