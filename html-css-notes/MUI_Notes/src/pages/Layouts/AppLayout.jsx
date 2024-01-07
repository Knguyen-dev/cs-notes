import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function AppLayout() {
	const [title, setTitle] = useState(null);

	const location = useLocation();

	// Creating an effect that updates title every time the location/route changes
	useEffect(() => {
		const parsedTitle = location.pathname.replace(/\W/g, " ");
		setTitle(parsedTitle);
	}, [location]);

	return (
		<Grid container>
			<Navbar />
			<Header title={title} />
			<Outlet />
		</Grid>
	);
}
