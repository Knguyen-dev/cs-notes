import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/*
- Our protected route that's protected based on certain roles.
  Check in our auth to see if one of the roles from the currently logged in
  user matches one of the roles we've defined for this route.
  So just wrap this around your routes that you want to protect


*/
const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();

	const location = useLocation();

	/*
  1. If one of the roles match, let the user navigate to the protected route 
  2. This the user didn't have one of the allowedRoles, but they're still authenticated
    since 'auth' is defined, they just aren't authorized. In this case

  - Explaining from location:
  1. User goes to '/home' route, but isn't logged in. Home is protected
    and so we record 'location' in this component, which should contain the path '/home', which
    is where they wanted to go.
  2. If the user isn't authenticated we navigate to '/login' route and pass in a 
    state value 'from: location'. As a result, when a user is redirected to the 
    login route, we can try to see what page they were trying to access before 
    we redirected them. Do replace so that when they go back in the history, 
    we take them to the route they were on before they got redirected.
    So if they were on signup page, and they try to go to the 'home' page. Then
    we redirect them to the login page. However if they try to hit 'back' on the history
    we replace the history and take them to the 'signup page', where they first were.
  */
	return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : auth?.user ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
