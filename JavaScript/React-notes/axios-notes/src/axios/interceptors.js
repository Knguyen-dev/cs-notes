import axios from "axios";

const coolFetch = axios.create({
	baseURL: "https://course-api.com",
});

/*
+ Create an interceptor that changes the request before it's sent out:




- NOTE: Remember this is just a function that's run on the request object
  before it's sent out to a backend server. So in order for this to work
  we must always remember to return the request as well. This is very similar 
  to express middleware, if you've gotten to that point.
*/
coolFetch.interceptors.request.use(
	(request) => {
		// Before our coolFetch request, do a console.log and set the 'Accept' header
		console.log("Request Sending");
		request.headers.common["Accept"] = "application/json";
		return request;
	},

	// If there was an error, just return a promise that rejects into an error
	(error) => {
		return Promise.reject(error);
	}
);

coolFetch.interceptors.response.use(
	(response) => {
		/*
  - This callback runs only for successful or valid repsonses,
  so that would be 200-299. So for those successful responses, 
  console.log a message after.
  
  */
		console.log("Got response");

		return response;
	},
	(error) => {
		/*
    - This callback runs for unsuccesful responses. For example
    if we got a 404, this function would run and log out the 
    response object.

    - Can be very good for something like authentication, where if 
      on a request, we get a certain status code for 'unauthorized' we can 
      do things such as prompt the user to login again, or do something else.
    */

		if (error.response.status === 404) {
			console.log("Not Found!");
		}
		return Promise.reject(error);
	}
);

export default coolFetch;
