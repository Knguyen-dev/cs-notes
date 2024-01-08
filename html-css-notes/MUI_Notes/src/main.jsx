/*
+ Themes in Mui

1. Import theme provider and wrap it around the root of the project.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalCssPriority from "./GlobalCssPriority.jsx";
import { ThemeProvider } from "@mui/material";
import { dashBoardTheme } from "./pages/dashBoardTheme.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GlobalCssPriority>
			<ThemeProvider theme={dashBoardTheme}>
				<App />
			</ThemeProvider>
		</GlobalCssPriority>
	</React.StrictMode>
);
