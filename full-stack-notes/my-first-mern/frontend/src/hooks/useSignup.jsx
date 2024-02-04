/*
+ We want a custom hook that we can use on the Signup and Login form.
  This just modularizes the code and enforces code separation. 
  The plan is to sign up, get a response back, and then ultimately
  update the AuthContext state value. 

*/

import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default function useSignup() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password) => {
		/*
    + Given an email and password, register the user in our database and 
      authenticate them.

    + Make a POST request to our signup endpoint.
    - If it's successful it would send us back the email the user just signed
      up with, and a JWT token.
      1. We want to set the json {user's email, JWT} in localStorage, in their 
        browser. As a result, even if they close their browser, they'll still be authenticated
        if they come back. So if they refresh, the global state will be null, unless we go ahead
        and check for and get a jwt token from the user's local storage.
      2. Update our AuthContext state value! In this case we're sending in an 
        object with {email, JWT}, which will represent our user in our context provider.
        By doing this we log the user in when they actually sign in.

    - Else, on failure it would send back an error message, which are defined
      in the "User" model's signup method, or it could be one of mongoose's errors.
      Just set the error message to the one we got from our Express server.

    - Finally: Regardless of whether or not the request failed or succeeded, 
      indicate that we aren't loading anymore.
    
    - Reminder about try/catch: Again, here we can catch errors related to trying to connect to the server.
      All other errors happen when our request goes through, but maybe our backend doesn't like 
      our data and sends back some stuff. While here we're trying to catch any
      connectivity or network errors that try to prevent us from connecting in the first place.
    */
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("http://localhost:3000/api/user/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const json = await response.json();

			if (!response.ok) {
				setError(json.error);
			} else {
				localStorage.setItem("user", JSON.stringify(json));
				dispatch({ type: "LOGIN", payload: json });
			}
		} catch (err) {
			setError("Something went wrong. Try again later!");
			console.error("Sign up error: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Return our values so we can grab all of these things from our
	return { signup, isLoading, error };
}
