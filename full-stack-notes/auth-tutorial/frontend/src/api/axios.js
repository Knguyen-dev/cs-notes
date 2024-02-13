import axios from "axios";

/*
- Our default axios instance that directly targets
our server. As a result we can use this custom fetch
function to fetch for stuff on our server.

- Idea: axiosPrivate is going to be the fetch we use when 
  we're making a request that we know requires an access token.
  We're going to attach interceptors to axiosPrivate, and these
  will attach the jwt access token to the request for us before
  it's sent out. And it will retry the request when 
  it fails, which is the status 403 forbidden.
  

*/

const BASE_URL = "http://localhost:3000";
export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json", // here we're accepting json
		withCredentials: true, // Allow cookies to be sent and set
	},
});
