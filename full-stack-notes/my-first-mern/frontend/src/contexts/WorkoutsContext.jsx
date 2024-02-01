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

/*
+ ACTIONS: Of course use an object that contains the 
  possible actions for your dispatch function. It's a lot better than
  typing out strings and potentially making a mistake.
*/
export const WORKOUT_ACTIONS = {
	SET_WORKOUTS: "SET_WORKOUTS",
	CREATE_WORKOUT: "CREATE_WORKOUT",
};

// Dispatch function that updates the state of our complex object
export const workoutsReducer = (state, action) => {
	switch (action) {
		// Updating workouts to new value, action.payload is array of workouts
		case WORKOUT_ACTIONS.SET_WORKOUTS:
			return {
				workouts: action.payload,
			};

		/*
    + Creating a new workout, assume action.payload is the new workout object

    - NOTE: The conditional protects us in the case where
      state.workouts is still null, as it'd cause an error to do 
      spread operator on null. However, this shouldn't happen in our 
      current app. This is just protective coding just in case we add
      something new or different.
      1. Our effect runs in the home page that sets the workouts to an array.
        Even if no workouts are found, it should be an empty array.
      
    */
		case WORKOUT_ACTIONS.CREATE_WORKOUT:
			if (!state.workouts) {
				return {
					workouts: [action.payload],
				};
			} else {
				return {
					workouts: [...state.workouts, action.payload],
				};
			}

		// For unrecognized types, just return the state unchanged
		default:
			return state;
	}
};

export const WorkoutsContextProvider = ({ children }) => {
	// Our state is an object with workouts as null
	const [state, dispatch] = useReducer(workoutsReducer, {
		workouts: null,
	});

	/*
  - We want to supply both the state value and the dispatch
    function to modify that state value. Since state is an object,
    we can choose to spread it out so we don't have to do 'state.something'
    or 'state.workouts' everytime.

  */
	return (
		<WorkoutsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WorkoutsContext.Provider>
	);
};
