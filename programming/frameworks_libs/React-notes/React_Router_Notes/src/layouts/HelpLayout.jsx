/*

Layout for the help section, and any routes nested in the help
    section will have their contents rendered Outlet's place.

- Since we want the help section to have a little nav it's the same procedure
1. Define the navlinks with the paths. You don't have to do the full path, 
    as react will do that for you. You just have to think about making the paths
    nested in/relative to HelpLayout or "/help"
*/

import { NavLink, Outlet } from "react-router-dom";
export default function HelpLayout() {
	return (
		<div className="help-layout">
			<h2>Help Section</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa mollitia
				eum eveniet alias dolores, magni similique quae molestiae iste
				dignissimos rem cumque est accusamus fugiat.
			</p>
			<nav>
				<NavLink to="faq">View the FAQ</NavLink>
				<NavLink to="contact">Contact Us</NavLink>
			</nav>
			<Outlet />
		</div>
	);
}
