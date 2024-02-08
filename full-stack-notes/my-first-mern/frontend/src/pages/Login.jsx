import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
/*
+ Just your standard login form. 

*/

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		/*
    1. Attempt to login the user. So all of our logic with the token, localstorage, and global state
      are handled in our hook.
    2. Now all we need to do out in this form is render potential error messages and 
      disable the 'login' button whilst we're processing their login request.


    - Takeaway: With our auth context and custom hooks for logging in and signing up, we've 
      managed to control the auth state and the jwt in the client's browser.

    */
		await login(email, password);
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3>Login</h3>

			<label htmlFor="email">Email:</label>
			<input
				type="email"
				name="email"
				id="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>

			<label htmlFor="password">Password:</label>
			<input
				type="password"
				name="password"
				id="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>

			<button type="submit" disabled={isLoading}>
				Login
			</button>

			{error && <div className="error">{error}</div>}
		</form>
	);
}
