import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import VerifyEmailPage from "./components/VerifyEmail";

function App() {
	const appRouter = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route index path="login" element={<LoginPage />} />
				<Route path="signup" element={<SignupPage />} />
				<Route path="verify-email/:token" element={<VerifyEmailPage />} />
			</Route>
		)
	);

	return <RouterProvider router={appRouter} />;
}

export default App;
