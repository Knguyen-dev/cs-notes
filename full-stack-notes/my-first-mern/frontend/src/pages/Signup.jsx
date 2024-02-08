import { useState } from "react";
import useSignup from "../hooks/useSignup";
/*
+ Just your standard signup form

*/

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signup, error, isLoading } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Attempt to sign up with user's email and plaintext passwrod
		await signup(email, password);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign up</h3>

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

			{/* Disable the button whilst the request for signing up the user is happening */}
			<button disabled={isLoading} type="submit">
				Sign up
			</button>

			{/* Output an error is there's one */}
			{error && <div className="error">{error}</div>}
		</form>
	);
}
