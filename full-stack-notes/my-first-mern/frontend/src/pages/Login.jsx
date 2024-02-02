import { useState } from "react";

/*
+ Just your standard login form. 

*/

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(email, password);
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
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

			<button type="submit">Login</button>
		</form>
	);
}
