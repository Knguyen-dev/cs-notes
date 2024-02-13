import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

/*
- A simple login page.


*/

// Our api endpoint we hit
const LOGIN_URL = "/auth";

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();

	/*
  - Try to see what page they were trying to reach before they
    were redirected to the login page. If we didn't pass a state, then
    default to '/', which is just our home page. This means if they weren't
    redirected from somewhere, when they login we navigate them to the 
    home page.
  */
	const from = location.state?.from?.pathname || "/";

	// Refs
	const userRef = useRef();
	const errRef = useRef();

	// States for tracking username and password input.
	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");

	// Tracks what error message that should be shown
	const [errMsg, setErrMsg] = useState("");

	// Focuses on the username input on load, which is pretty convenient
	useEffect(() => {
		userRef.current.focus();
	}, []);

	/*
  - Everytime the values for username and password change, we 
    remove the error message. So when they type the error message 
    goes away, which is helpful for real-time form feedback
  */
	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const togglePersist = () => {
		setPersist((prev) => !prev);
	};

	useEffect(() => {
		localStorage.setItem("persist", persist);
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			/*
      - Post request sending username and password as json.
      - NOTE: Set withCredentials to true so that we can get 
        cookies from the server. The cookie we're getting would 
        be the refresh token cookie named 'jwt'.
      */
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);

			/*
      - Destructure and set key information for the auth provider.
        So the access token, the roles of the user are the main ones.
        Here we also set the username and password to show that we simply can.
      */
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ user, pwd, roles, accessToken });
			setUser("");
			setPwd("");

			/*
      - We know it's a valid response so redirect the user to 'from'.
        We do replace: true, helping prevent user from going back to login page, 
        and actually redirecting them to where htey were before they accessed
        the login page.
      
      */
			navigate(from, { replace: true });
		} catch (err) {
			// Based on the different types of responses, we change the error message
			// we show.
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? "errmsg" : "offscreen"}
				aria-live="assertive">
				{errMsg}
			</p>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<button>Sign In</button>

				<div className="persistCheck">
					<input
						type="checkbox"
						id="persist"
						onChange={togglePersist}
						checked={persist}
					/>
					<label htmlFor="persist">Trust this device</label>
				</div>
			</form>
			<p>
				Need an Account?
				<br />
				<span className="line">
					<Link to="/register">Sign Up</Link>
				</span>
			</p>
		</section>
	);
};

export default Login;
