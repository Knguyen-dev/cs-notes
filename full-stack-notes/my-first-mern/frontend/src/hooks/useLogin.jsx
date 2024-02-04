import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	/*
  + Login function which is essentially the same as 
    the signup function.

  1. Make a call to our login endpoint on your backend application, which checks if our username or password is 
    correct. Then if so, it returns us the user's email and a jwt token that we'll 
    make use of later.
  */
	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch("http://localhost:3000/api/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		// Get the json data from the response
		const json = await response.json();

		// Get back our json response, it could be an error or a success
		try {
			/*
    - if login was good:
    1. We want to save the object containing {email, token} to local storage
    2. Update our authentication state using our dispatch function. Pass our 
      json as the payload, which will make user = {user's email, JWT}
    - Else: We should have been given a response with an error property that'll
      tell the user why their authentication failed.
    */
			if (response.ok) {
				localStorage.setItem("user", JSON.stringify(json));
				dispatch({ type: "LOGIN", payload: json });
			} else {
				setError(json.error);
			}
		} catch (err) {
			setError("Something went wrong try again later!");
		} finally {
			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
};
