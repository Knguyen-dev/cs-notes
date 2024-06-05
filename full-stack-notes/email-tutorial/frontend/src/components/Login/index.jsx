import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"; // using css modules to avoid name conflicts
import { axiosPublic } from "../../api/axios";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const [msg, setMsg] = useState("");

	// Handling input change
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/auth/signup";

			// Attempt to hit the login endpoint
			await axiosPublic.post(url, data);

			// At this point, successful, We'll use the error state to notify when a login was successful, it's fine.
			setMsg("Successfully Logged in!");
		} catch (error) {
			// If it was a server-related error, get the error message
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				{/* Form for email and password */}
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{msg && <div className={styles.success_msg}>{msg}</div>}
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>

				{/* Link to sign up page instead */}
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
