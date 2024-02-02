import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AppLayout from "./layouts/AppLayout";

function App() {
	const appRouter = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />

				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Route>
		)
	);

	return <RouterProvider router={appRouter} />;
}

export default App;
