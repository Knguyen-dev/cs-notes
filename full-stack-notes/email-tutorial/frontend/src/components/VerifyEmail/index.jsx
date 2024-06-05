/*
+ What's this?
So when the user signs up, we send a link to verify their email. That link will send them to this page and component, that 
will show them a success screen or failure screen depending on whether the link was valid or not. Here we'll make a GET 
request to the backend.



*/

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Fragment } from "react";
import { axiosPublic } from "../../api/axios";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const { token } = useParams();
	const [error, setError] = useState("");

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				// Make a request to the backend to verify the user's email, given the token in the route parameter
				const url = `/auth/verify-email/${token}`;
				await axiosPublic.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
				setError(error.response.data.message);
			}
		};
		verifyEmailUrl();
	}, [token]);

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>Error {error}</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;
