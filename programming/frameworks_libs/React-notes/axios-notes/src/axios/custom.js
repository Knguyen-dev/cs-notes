import axios from "axios";

/*

- baseURL: Let's say for authFetch we're only making requests to a certain
  domain or website. Then we can define the base/root url so that we 
  don't have to type out the entire website everytime. So we can 

- use authFetch now to fetch data. So doing authFetch('/some_endpoint') 
  will fetch data from 'https://course-api.com/some_endpoint'

*/
const authFetch = axios.create({
	baseURL: "https://course-api.com",
	headers: {
		Accept: "application/json",
	},
});

export default authFetch;
