/*

1. Imports React and the ReactDOM package.
2. Import the App component from "App.jsx", so that we can render it in the DOM.
3. Import CSS styling
4. Create a 'root' object by using ReactDOM.createRoot method, but also using an element from index.html with id "root"
5. Finally invoke rendre method 

*/

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
