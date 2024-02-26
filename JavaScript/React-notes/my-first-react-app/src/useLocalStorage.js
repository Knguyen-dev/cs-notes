/*
+ useLocalStorage: A react hook that makes it easier to work 
  with local storage. 

- NOTE: This hook is made to be flexible and used with future projects, so 
  there will be complex stuff and mentions. But we will clear that up when
  we get to them
*/

import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
	// If using hook in SSR (server-side-rendering or server-side-react such as Next.js)
	if (typeof window === "undefined") return initValue;

	// Try to get a value from local storage
	const localValue = JSON.parse(localStorage.getItem(key));

	console.log("Local vlaue: ", localValue);
	if (localValue) return localValue;

	/*
  - At this point, localValue didn't exist so there was nothign for that 
    key in localStorage. 
    
  1. If our initial value was a function for some reason, then we should call the function because it likely
    generates the initial value that we should use for localStorage. 

  2. Else our initValue wasn't a function, so we'll just return our initial
    value that we passed in. If it's not obvious alredy, the reason we're 
    using 'initValue' is because it allows us to default to a 'default' value 
    if the localStorage item doesn't exist. It sets that initial value for that 
    localStorage item.
  */
	if (initValue instanceof Function) return initValue();

	return initValue;
};

export default function useLocalStorage(key, initValue) {
	/*
  + States:
  - value: If we find something in localStorage with that value, then
    we set it to the state. Otherwise, we set a default value for the 
    value in the key-value pair. This state tracks the local storage
    value!
  */
	const [value, setValue] = useState(() => getLocalValue(key, initValue));

	/*
  + Effect that sets value: So if the key or value changes,
    we're going to set a new item in local storage. So when 
    we first call this hook, it will set the a pair with 
    the key we first called. However, whenever we change 
    the value state, we update the local storage value!
  */
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return { value, setValue };
}
