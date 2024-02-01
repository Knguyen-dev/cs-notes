import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";

function App() {
	const appRouter = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />
			</Route>
		)
	);

	return <RouterProvider router={appRouter} />;
}

export default App;
