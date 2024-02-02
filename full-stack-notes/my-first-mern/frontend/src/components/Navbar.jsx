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

const Navbar = () => {
	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>Workout Buddy</h1>
				</Link>

				<nav>
					<div>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
