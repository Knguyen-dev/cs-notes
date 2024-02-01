import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
	return (
		<div className="App">
			<Navbar />
			<div className="pages">
				<Outlet />
			</div>
		</div>
	);
}
