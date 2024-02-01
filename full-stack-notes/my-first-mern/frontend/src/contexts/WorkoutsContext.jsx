/*
+ WorkoutsContext: We don't want to pass our array of workouts through mulitple layers of our application,
  so we're just going to use context providers to share the data. We're 
  going to use useReducer here since our state value is an array of complex objects.
  As well as this 

*/

import { createContext, useEffect, useReducer } from "react";
export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
	switch (action) {
		// Updating workouts to new value, action.payload is array of workouts
		case "SET_WORKOUTS":
			return {
				workouts: action.payload,
			};

		// Creating a new workout, assume action.payload is the new workout object
		case "CREATE_WORKOUT":
			return {
				workouts: [...state, action.payload],
			};
	}
};

export const WorkoutsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, {
		workouts: null,
	});

	return <WorkoutsContext.Provider>{children}</WorkoutsContext.Provider>;
};
