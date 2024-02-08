/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/*
+ WorkoutsContext: When the user updates or manipulates the workouts, we won't 
  want to have to fetch data from the database everytime to update the client.
  So alongside the database being updated, we'll have a state that  
  tracks and match the changes the user makes to the workouts in the database.

- NOTE:
1. We don't want to pass our array of workouts through mulitple layers of our application,
  so we're just going to use context providers to share the data. We're 
  going to use useReducer here since our state value is an array of complex objects.
2. We'll create a useWorkoutsContext hoook as well.

*/

import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
	switch (action.type) {
		case "SET_WORKOUTS":
			return {
				workouts: action.payload,
			};
		case "CREATE_WORKOUT":
			return {
				workouts: [action.payload, ...state.workouts],
			};

		// Keep all workouts where their id doesn't match the deleted workout
		// Assume action.payload is our deleted workout
		case "DELETE_WORKOUT":
			return {
				workouts: state.workouts.filter((w) => w._id !== action.payload._id),
			};

		default:
			return state;
	}
};

export const WorkoutsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, {
		workouts: null,
	});

	return (
		<WorkoutsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WorkoutsContext.Provider>
	);
};
