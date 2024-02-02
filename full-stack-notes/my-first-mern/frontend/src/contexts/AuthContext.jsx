/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";

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
