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
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

/*
- Roles that match the backend:
Note that anyone can see these codes since it's frontend, 
so you may want to use environment variables here to make it 
harder to find out
*/

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

				<Route element={<PersistLogin />}>
					{/* To access the home page they must have the user role */}
					<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
						<Route path="/" element={<Home />} />
					</Route>

					{/* To access the editor route, they must have the editor role */}
					<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
						<Route path="editor" element={<Editor />} />
					</Route>

					<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
						<Route path="admin" element={<Admin />} />
					</Route>

					{/* Here, allow them to access the route if they have the editor or the admin role. Allowing
          for both editors and admins to be able to go in */}
					<Route
						element={
							<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
						}>
						<Route path="lounge" element={<Lounge />} />
					</Route>
				</Route>

				{/* catch all 404 page*/}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}

export default App;
