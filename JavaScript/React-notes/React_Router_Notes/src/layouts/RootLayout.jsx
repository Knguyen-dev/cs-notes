/*
- In order for NavLinks to be able to route correctly in 6.4, they 
	need to be in the same context as the Browser router. So 
	we'll pass this RootLayout, to the browser router in order for 
	these links to correctly route the user.
- Then we need a place or an output area for where these page components 
	are going to be rendered. As a result we'll use the Outlet component




1. Define our root layout or what the base page will be 
2. Create our header and then create the links and their paths.
3. Outlet: We create our output area for where our pages go. Now, 
	any other component or page we get routed to will be rendered 
	in Outlet's place.

NOTE: A RootLayout will always stay on the page, hence the name.
	In this case, we're going to render it on an index url
*/

import { NavLink, Outlet } from "react-router-dom";
export default function RootLayout() {
	return (
		<div className="root-layout">
			<header>
				<nav>
					<h1>Jobarouter</h1>
					<NavLink to="/">Home</NavLink>
					<NavLink to="about">About</NavLink>
					<NavLink to="help">Help</NavLink>
					<NavLink to="careers">Careers</NavLink>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
