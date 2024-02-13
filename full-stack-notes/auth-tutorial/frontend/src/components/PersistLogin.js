import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

/*
+ Now, you would wrap this component around your protected
  routes. Now when the user hits refresh, the auth state clears, but
  because we are in one of the routes wrapped by 'PersistLogin'
  our useEffect will run, and then refresh that access token
  for us.

- Now if the refresh token expires and we're on a protected route,
  the PersistLogin and RequireAuth component work together to 
  redirect the user. PersistLogin is on the outside and is therefore 
  the first check and it checks if we can authenticate them. If not 
  due to our refresh token, then our auth state is empty. Our 
  PersistLogin component renders the outlet, and then RequireAuth sees
  the user isn't authenticated and redirects them.

+ Toggling persist:
- If persist is true, then auth state is persisted on refresh
- Else: If not persist, then it isn't persisted on refresh.
*/

export default function PersistLogin() {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth, persist } = useAuth();

	useEffect(() => {
		let isMounted = true;
		/*
    1. Explanation: To verify that our refresh token is 
      valid and not expired, we'll just hit the '/refresh' endpoint.
      If our refresh token is valid, we'll get a good response and 
      refresh our access token. Else our refresh function will throw an 
      error that we will catch here, and that will show the refresh token
      isn't valid (probably expired).
    
    2. However, we don't want to hit this endpoint on every refresh.
      First check if we don't have an access token before hitting.
    */
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				/*
        - The reason we do isMounted when doing these effects
        is because memory leaks sometimes happen due to changing the 
        state on a component that isn't mounted. By having this 
        check, we only change state when we know the component is mounted
        
        */
				isMounted && setIsLoading(false);
			}
		};

		/*
    - If access token doesn't exist, call our function to 
      verify the refresh token's validity. Note that if this succeeds
      then the global state 'auth' will be refreshed too.
      
    - Else indicate that we're not loading anymore.

    - Empty dependency array since we're only running this 
      once on refresh or page. However we defined some 
      dependencies that shouldn't change things. 'refresh' isn't
      going to change. And when refreshing, auth only changes
      when firing 'refresh' successfully for the first time. On 
      the second effect, '.accessToken' is defined so it won't hit 
      the backend twice.
    */
		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, [auth, refresh]);

	// Now when loading those protected pages, we get a loading screen!
	return (
		// toggling persist logic
		<>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>

		// <>{isLoading ? <p>Loading...</p> : <Outlet />}</>; regular logic without toggling
	);
}
