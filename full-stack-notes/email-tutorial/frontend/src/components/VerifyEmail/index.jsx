/*
+ What's this?
So when the user signs up, we send a link to verify their email. That link will send them to this page and component, that 
will show them a success screen or failure screen depending on whether the link was valid or not. Here we'll make a GET 
request to the backend.



*/

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react";
import { axiosPublic } from "../../api/axios";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const { token } = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `/api/auth/verify/${token}`;
				await axiosPublic.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [token]);

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;
