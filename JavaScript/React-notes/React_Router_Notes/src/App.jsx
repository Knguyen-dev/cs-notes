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
import Faq from "./pages/help/Faq";
import Contact from "./pages/help/Contact";
import NotFound from "./pages/NotFound";
import Careers, { careersLoader } from "./pages/careers/Careers";
import CareerDetails, {
	careerDetailsLoader,
} from "./pages/careers/CareerDetails";

// layouts
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";
import CareersLayout from "./layouts/CareersLayout";

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
	the RootLayout, and HelpLayout will always be there for 
	"help/somePath". So the HelpLayout could be the home page 
	of the 'Help' section of the website, and the deeper routes
	could be its different contents. 

	NOTE: 
	1. Going to '/help' will not render anything inside 
		HelpLayout's outlet. If we a component to load with it 
		we'd make one of its deeper routes an index route.
	2. Remember when on path "/help/somePath" the HelpLayout 
		is being rendered in the the parent layout (RootLayout)'s 
		outlet.


- CareersLayout:
	1. Note that we have an index route nested inside of it
		so doing "/careers" will not only render the CareersLayout but
		it will also render the 'Careers' component inside its outlet
		as well.
	2. We use a loader function, meaning our function we link to it 
		will be executed before the page renders. As a result the associated
		component will be able to access that fetched data and use it during 
		its own rendering process

- Route Parameters with career details:
	1. Going to /careers:id we create a route with parameter 'id'
	2. Create our for this route and destructure the parameter
		'id', in order for us to differentiate what 'item' we 
		are displaying info for.
	3. Finally, we should be able to do /careers/some_id and it works



- CatchAll Route (Custom Error Page):
	1. Create a route nested at the bottom of the parent root 
		that has your root layout. Set the path to "*"
	2. As a result, when the url types in a path that doesn't
		match any of the above that you've 

*/
const myRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			{/* Example of index route or "/" */}
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />

			{/* An example of nested routes, Note that  */}
			<Route path="help" element={<HelpLayout />}>
				<Route path="faq" element={<Faq />} />
				<Route path="contact" element={<Contact />} />
			</Route>

			<Route path="careers" element={<CareersLayout />}>
				{/* Route using a loader so that the component associated with it gets fetched data */}
				<Route index element={<Careers />} loader={careersLoader} />

				{/* Route using route parameter */}
				<Route
					path=":id"
					element={<CareerDetails />}
					loader={careerDetailsLoader}
				/>
			</Route>

			{/* Catch all custom 404 page route */}
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={myRouter} />;
}
export default App;
