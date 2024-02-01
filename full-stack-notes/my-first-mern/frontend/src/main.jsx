import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutsContextProvider } from "./contexts/WorkoutsContext.jsx";

/*
+ About context providers: Remember the typical thing is to 
  wrap the context provider around your App or base react component.


*/
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WorkoutsContextProvider>
			<App />
		</WorkoutsContextProvider>
	</React.StrictMode>
);
