import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

/*
- Just a hook that returns the axios instance with the 
  request and response interceptors connected to it.


- IDEA: We're going to make it so our requests are retried with 
  a new access token when they fail due to 403 status code.

- Takeaway: 
1. With axiosPrivate we have a custom fetch function that 
  configures the url, json, and cookies. Now with our useAxiosPrivate
  hook, we added 2 things. A function that runs before the request to 
  ensure it has an authorization header. Then a function that runs after
  receiving a response that can potentially retry the request with a 
  new access token.

2. Now let's see what happens when clients render 'Users'. So if the access 
  token is expired, we will get a failed response 400, but that happens in the back
  ground. Our response interceptor will get a new refresh token for the user, 
  and retry the request. And as a result, we render the data seamlessly.
  Okay, at this point we've handled the expiration of access tokens when 
  fetching data, but in our User's component we still need to handle what we 
  should do when the refresh token expires.

*/
export default function useAxiosPrivate() {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		// Ensures 'Authorization' header is defined with an access token
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(request) => {
				/*
        - If 'Authorization' header doesn't exist, this is the first 
          attempt at the fetch since we haven't set up the header wtih the token
          yet. Well in any case, if the Authorization header isn't defined, 
          we will define it with our access token in auth. So this 
          '.accessToken' here could be the accessToken after we logged in, or 
          an access token we got after a refresh.

        - Else, if 'Authorization' header was already been set, then we know that
          this request is a retry as it went through this conditional before 
          and the authorization header likely got updated by the response interceptor too.
        */
				if (!request.headers["Authorization"]) {
					request.headers["Authorization"] = `Bearer ${auth.accessToken}`;
				}

				return request;
			},
			(err) => {
				Promise.reject(err);
			}
		);

		/*
    - responseIntercept: Ensures that on the first time we 
      get a '403' response, we get a new access token and retry that request once more.
    1. If successful response, we do nothing and just return the response.
    2. Else if there's been an error, we get the previous request sent by 
      the axiosPrivate instance. 
    3. If the previous request got a '403' AND '.sent' doesn't exist or isn't true. 'sent'
      is our custom property to indicate whether we've 'retried' a fetch request. If 'sent', then 
      that means we already retried the request once. This conditional makes it so when we fail 
      a request, we only retry it once, and as a result we're not going to be stuck in an endless 
      loop of 403 status codes.

    - NOTE: Retroactively, we want our server to send 401 to indicate bad 
      credentials, because 403 mans we don't have permissions to do something.
    */
		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => {
				return response;
			},
			async (err) => {
				const prevRequest = err?.config;
				if (err?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true; // set to true since we're retrying
					const newAccessToken = await refresh(); // get the new access token
					// Update the authorization header with new access token
					prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
					/*
          - We can just pass in our updated request 'prevRequest' into
            our axiosPrivate to retry our request with the new access
            token.
          */
					return axiosPrivate(prevRequest);
				}

				// Well if we didn't get a 403 or we already retried our request, we gotta return back an error
				// which will be caught by our catch block.
				return Promise.reject(err);
			}
		);

		/*
    - Remember these interceptors don't use disappear. So 
      we'll remove them with a cleanup function.
    */

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);

	return axiosPrivate;
}
