/*
+ Users: Just a component to render the current
  users in the database.


*/

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

/*
+ Effect:
1. Our boolean to track when our component has been mounted.
  It's simple, as when our effect runs that means our rendering is 
  done and it has been committed to the DOM. It's been mounted.
2. AbortController: Given by JavaScript web API and it allows us to 
  control and cancel asynchronous operations, such as requests and timers.
  In this case, we want to cancel the request when the component unmounts as 
  it's not being rendered anymore. To connect a controller to axios, 
  pass it in our options parameter.

+ Handling refresh token expiration:
- When the refresh token expires we have to prompt the 
  user to login and hand in their credentials again.

*/

export default function Users() {
	const [users, setUsers] = useState();
	const navigate = useNavigate();
	const location = useLocation();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getUsers = async () => {
			try {
				/*
        - Fetch data. Note that '/users' should be a protected
          route so we have to send an access token but also 
          ensure that our cookies are being sent as well. So
          we'll create custom axios instances to do that.
        */
				const response = await axiosPrivate.get("/users", {
					signal: controller.signal,
				});

				/*
        - If our component is still mounted, set the 
          user data.
        */
				isMounted && setUsers(response.data);
			} catch (err) {
				console.error(err.response);
				/*
        - When refresh token fails, we send back to the login page. 
          Here's how it works I think:

        1. Go to the user's page call fetch for users. Okay
          it fails. This means our access token expired.
        2. Then it will try to get a new access token, and 
        fail. At that point the authorization header doesn't have a bearer
        token.
        3. It runs the retry with a null access token, which leads to the 
          second 403. At this point, we check prevRequest, and see that '.sent'
          is already put on there, so we leave it at one retry.
        4. This causes the interceptor to return a promise that resolves to an error
          which is caught by our getUsers() catch block.
      
        - Abstraction: If catch block is triggered, then we failed the 
          initial request (access token expired), and we failed the retry (so refresh token already expired)
          meaning we'll have to redirect the user to the login page again. 
          Though we'll track location, so that after they log in they're 
          sent back to this 'Users' page.
        
        
        */
				navigate("/login", { state: { from: location }, replace: true });
			}
		};

		getUsers();

		/*
    - Clean up function runs as the component unmounts. 
      Essentially, if we're still doing a request, and we unmount,
      this cleanup function prevents us from unnecessarily 
      setting the state.
    */
		return () => {
			isMounted = false;
			controller.abort();
		};
	});

	return (
		<article>
			<h2>Users List</h2>

			{users?.length ? (
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user?.username}</li>
					))}
				</ul>
			) : (
				<p>No users to display</p>
			)}
		</article>
	);
}
