/*
+ Modern Way of React Router 



*/

import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";

// layouts
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";
/*
+ How to create Router:
1. Parent root and RootLayout: The parent root being index
	is a way of including the rootlayout. A component that lays
	the foundations such as a header/navbar that is always there,
	and an area where all of the pages are rendered. So when the 
	user is on the index url, we render the RootLayout and the Home
	component.

2. Then we continue defining our routes, not only so that 
	users can go to other pages, but also to ensure that the 
	routes we've defined in our NavLinks are available.

3. As a result, we've created the root layout or markup our 
	application is going to use, and we've setup the routes.
	Pass our router into a RouterProvider component 
	that our App component returns, and we're done.

+ Nested Routes: Putting routes inside of other routes. A 
	root will be relative to its parent, meaning 'parentRoot/childRoot'.
	So when nesting you don't need to put path="/childroot" because React-Router
	will do that automatically when linking parent to child.

- RootLayout: Rendered on the index path. Any route deeper 
	than it, will be rendered inside of it.

- HelpLayout: Another parent route, any route nested in it will be
	rendered in it. So "/help" will render the HelpLayout inside
	the RootLayout. So the HelpLayout could be the home page 
	of the 'Help' section of the website, and the deeper routes
	could be its different contents. It should be noted that 
	"/help" path right now would have nothing rendered in its 
	outlet because we aren't accessing a route deeper than it and 
	we haven't defined an index route relative to it yet. 





*/
const myRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />

			<Route path="help" element={<HelpLayout />}>
				<Route path="faq" />
			</Route>
		</Route>
	)
);

function App() {
	return <RouterProvider router={myRouter} />;
}
export default App;
