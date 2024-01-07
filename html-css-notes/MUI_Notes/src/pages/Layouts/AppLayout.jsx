import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Grid } from "@mui/material";
export default function AppLayout() {
	return (
		<Grid container>
			<Navbar />
			<Outlet />
		</Grid>
	);
}
