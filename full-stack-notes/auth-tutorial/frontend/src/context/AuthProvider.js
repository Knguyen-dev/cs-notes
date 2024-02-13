// Simple bare bones auth provider

import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	/*
  - Complex object that contains four things
  which are the username, password, list of roles, and access token.
  
  */
	const [auth, setAuth] = useState({});

	/*
  - So the last thing is to be able to toggle PersistLogin. Let's 
  say if user clicks 'trust this device', then we activate PersistLogin. 
  As a result, on refresh we'll try to refresh the access token for our 
  protected routes. Else if the user doesn't trust the device, we'll turn off
  PersistLogin, meaning even if the user has a valid refresh token, we 
  aren't going to attempt to refresh the access token.

  - How to do it:
  1. Store the preference in localStorage, it'll be a boolean.
    If it exists get the value, else if it doesn't exist default to 'false' 
    which ensures security.

  2. 
  
  
  
  */
	const [persist, setPersist] = useState(
		JSON.parse(localStorage.getItem("persist")) || false
	);

	return (
		<AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
