/*


+ NOTE: 
1. Links and NavLinks all have to be in the context
  of a BrowserRouter or a RouterProvider, otherwise it won't 
  work and you'll get an error

2. About routing: Remember here we're handling client side routing.
  Our react app is also running on a different port number than the 
  express app, so that prevents us from somehow routing to an api endpoint.



*/
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
	const logout = useLogout();

	// Get the user value from our AuthProvider, remember user = {email, jwt}
	const { user } = useAuthContext();

	const handleClick = () => {
		logout();
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>Workout Buddy</h1>
				</Link>

				<nav>
					{/* 
          - If user is defined, logged in, then show their email and a log out button, 
          - Else just show login and signup buttons.
          */}
					{user ? (
						<div>
							<span>{user.email}</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					) : (
						<div>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
