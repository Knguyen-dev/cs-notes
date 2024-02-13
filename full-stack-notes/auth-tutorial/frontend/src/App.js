import Register from "./context/components/Register";
import Login from "./context/components/Login";
import Home from "./context/components/Home";
import Layout from "./context/components/Layout";
import Editor from "./context/components/Editor";
import Admin from "./context/components/Admin";
import Missing from "./context/components/Missing";
import Unauthorized from "./context/components/Unauthorized";
import Lounge from "./context/components/Lounge";
import LinkPage from "./context/components/LinkPage";
import RequireAuth from "./context/components/RequireAuth";
import { Routes, Route } from "react-router-dom";

// Roles that match the backend
const ROLES = {
	User: 2001,
	Editor: 1984,
	Admin: 5150,
};

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="linkpage" element={<LinkPage />} />
				<Route path="unauthorized" element={<Unauthorized />} />

				{/* we want to protect these routes */}
				<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
					<Route path="/" element={<Home />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
					<Route path="editor" element={<Editor />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
					<Route path="admin" element={<Admin />} />
				</Route>

				<Route
					element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
					<Route path="lounge" element={<Lounge />} />
				</Route>

				{/* catch all 404 page*/}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}

export default App;
