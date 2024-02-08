/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import { useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		// Logging in case, assume action.payload is the user logging in
		case "LOGIN":
			return {
				user: action.payload,
			};

		// If they logout, reset the user back to null
		case "LOGOUT":
			return {
				user: null,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		/*
    1. Get the 'user' key from local storage. Remember when it's in local storage it's a json
      string, so we need to parse/convert it into a javascript object.
    2. Now we don't know if we actually got something, check to see whether or not 
      the user had an object with the {email, token} in local storage. 
      If so, log them in, else don't.
      
    - By doing this we can make it so even if the user leaves or closes the 
      browser, then the next time they come in they're already authenticated. 
      Allowing our front end react application to remember our login state.
      And we didn't even need to check with the server because we're working with JWTs.
    */
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			dispatch({ type: "LOGIN", payload: user });
		}
	}, []);

	// Good for keeping track of the state in the browser
	console.log("AuthContext state: ", state);

	/*
  - Then our auth context will provide an object with all of the properties in 
    state, and then the dispatch function. 

  - NOTE: While it does look kind of pointless doing the spread operator 
    on an object with one property here. It's the idea that if we add more
    properties in the future, they're all laid out.
  */
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
	children: PropTypes.element,
};
