import {
	RouterProvider,
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";

// Layouts
import AppLayout from "./pages/Layouts/AppLayout";

// Pages
import Authentication from "./pages/Authentication/Authentication";
import Database from "./pages/Database/Database";
import Functions from "./pages/Functions/Functions";
import Hosting from "./pages/Hosting/Hosting";
import MachineLearning from "./pages/MachineLearning/MachineLearning";
import Storage from "./pages/Storage/Storage";

/*
+ Themes in Mui

1. Import theme provider and wrap it around the root of the project.
*/
import { ThemeProvider } from "@mui/material";
import { dashBoardTheme } from "./pages/dashBoardTheme";

const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route path="authentication" element={<Authentication />} />
			<Route path="database" element={<Database />} />
			<Route path="functions" element={<Functions />} />
			<Route path="hosting" element={<Hosting />} />
			<Route path="machine-learning" element={<MachineLearning />} />
			<Route path="storage" element={<Storage />} />
		</Route>
	)
);

function App() {
	return (
		<ThemeProvider theme={dashBoardTheme}>
			<RouterProvider router={appRouter} />
		</ThemeProvider>
	);
}

export default App;
