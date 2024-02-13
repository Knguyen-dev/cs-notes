import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

/*
+ How it fits in 
- Given that you logged out, the auth state should be 
  cleared, and you shouldn't have a refresh token cookie.
1. Go to home page (protected route), PersistLogin looks 
  at our auth state, and sees '.accessToken' isn't defined. It 
  tries to refresh your access token, but that fails as well.
  Now it's concrete that our auth state should be blank.
2. RequireAuth sees you're not even authenticated, so 
  it redirects you to the login page instead.



*/

const Home = () => {
	const navigate = useNavigate();
	const logout = useLogout();

	const signOut = async () => {
		await logout();
		navigate("/linkpage");
	};

	return (
		<section>
			<h1>Home</h1>
			<br />
			<p>You are logged in!</p>
			<br />
			<Link to="/editor">Go to the Editor page</Link>
			<br />
			<Link to="/admin">Go to the Admin page</Link>
			<br />
			<Link to="/lounge">Go to the Lounge</Link>
			<br />
			<Link to="/linkpage">Go to the link page</Link>
			<div className="flexGrow">
				<button onClick={signOut}>Sign Out</button>
			</div>
		</section>
	);
};

export default Home;
