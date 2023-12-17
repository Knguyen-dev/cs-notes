/*

- Careers Error: Basically going to be our more specific error page for errors that happen 
  with the careers section. Such as typing in a non-existent career id route, or in the case
  that our endpoint for loading careers was incorrect for Careers.jsx


- useRouteError: Gets the error message that's been given to the route. Then
  we can display that error message here, when an error is thrown.



*/

import { Link, useRouteError } from "react-router-dom";
export default function CareersError() {
	const error = useRouteError();
	return (
		<div className="careers-error">
			<h2>Error</h2>
			<p>{error.message}</p>
			<Link to="/">Back to the home page</Link>
		</div>
	);
}
