/*
+ useWorkoutsContext: Our custom hook function
  for getting the values from WorkoutsContext.

*/

import { useContext } from "react";
import { WorkoutsContext } from "../contexts/WorkoutsContext";

export default function useWorkoutsContext() {
	// Remember this is just the value in the context provider, so an
	// object in this case.
	const context = useContext(WorkoutsContext);

	/*
  - Context providers wrap around a component tree, making it 
    so everything inside or below it has access to the values 
    provided in the context provider. If we try to access
    the values of the contextprovider outside of that tree, then
    that's an error. So here we're handling that error and making it 
    easier for developers to realize what's wrong.
  */
	if (!context) {
		throw new Error(
			"useWorkoutsContext must be used inside a WorkoutsContextProvider"
		);
	}

	return context;
}
