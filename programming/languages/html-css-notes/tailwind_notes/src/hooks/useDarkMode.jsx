/*
+ Using a custom hook to manage the theme of a site

- In this custom hook: We manage the user's preference in local storage. Now
	you can 

*/
import { useState, useEffect } from 'react';

/*
- For accessing theme in local storage 


1. If value exists in local storage for our theme key then return it, else return the initial 
	value we passed through as the default theme value
2. Return storedValue and set Value

3. For setValue, if the value we somehow get is a function, then we call it with 'storedValue', 
	else for most cases, the value we're getting is just a key


- Generally a good useDarkMode hook which we'll use .
*/
const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error('Local Storage Theme Error: ', error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
};

/*
1. Access dark mode value and setter with some key. If the key for some
  reason is undefined, we retur nit 
2. 
*/
const useDarkMode = () => {
	const [enabled, setEnabled] = useLocalStorage('dark-theme');

	// if not undefined, return enabled boolean, else return false const isEnabled = typeof enabled !== 'undefined' ? enabled : false;

	const isEnabled = typeof enabled === 'undefined' && enabled;
	useEffect(() => {
		const className = 'dark';
		const bodyClass = window.document.body.classList;

		isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
	}, [isEnabled, enabled, setEnabled]);

	return [enabled, setEnabled];
};

export default useDarkMode;
