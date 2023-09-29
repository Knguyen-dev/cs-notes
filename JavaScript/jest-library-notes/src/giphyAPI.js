/*
- Doing unit tests with asynchronous calls, like fetch request. 

	1. If we try to test by just calling an api for real, it'd be slow, whilst unit 
		tests are supposed to run really fast. if we had 100 of these tests running it'd be inefficient.
	2. Using mocks we'd be able to run 100 of tests, and simulate results. So to mock a 
		fetch

- Let's do an example: Say you're building a application taht gets a gif. You call fetchGifURL to 
	to get the url of the gif. Now let's say you want to write unit tests for your funciton to make sure 
	it actually works, but you don't want to actually make HTTP requests to your api. This is because 
	it can slow down your tests and it creates the dependencies of relying on the api. So let's 
	use mock functions that emulates the behavior of our async function

	1. 
 */

import {
	createGifRequestURL
} from "./giphyUtils.js";

async function fetchGifURL(searchTerm) {
    const requestURL = createGifRequestURL(searchTerm);
	const response = await fetch(requestURL, {
        mode: "cors",
    });
	const jsonData = await response.json();
	return jsonData.data.images.original.url;
}

export {
	fetchGifURL,
}