/*
- useLocation: Returns an object with information about where the user currently is located
  on the site. One of the attributes is "path", which outputs the route path they're on
  such as "help/contact" if they're in the contact section, or maybe on some other 
  website "accountPage/settingsPage/...". We'll this path, and separate the words 
  to make links in the form: accountPage -> settingsPage -> changePasswordPage.

- NOTE: 
  1. Our breadcrumbs should be on the root layout since we always want it to be visible
  2. Also the hook activates everytime the user's path changes, which is how this component 
    re-renders and works.



*/

import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
	const location = useLocation();

	let currentLink = "";

	/*
  1. For example. "/help/contact", we'd get ["","help","contact"] and if there as a trailing
    slash, we'd be an empty string at the end as well with .split("/"). So we'll just use 
    filter to remove them.
  2. Now 'crumbs' is an array of words in our path. We will concatenate our crumbs to 
    create a 'currentLink'. First iteration "currentLink" = "/help" and we return markup
    that returns a Link to "/help", which works. Then second iteration it's "/help/contact" and
    we return a link that goes to "/help/contact", and that will also work. These breadcrumbs 
    are in the root layout, so these links would be able to properly go down the route 
    tree. 
  
  
  */

	const crumbs = location.pathname
		.split("/")
		.filter((crumb) => crumb !== "")
		.map((crumb) => {
			currentLink += `/${crumb}`;
			return (
				<div className="crumb" key={crumb}>
					<Link to={currentLink}>{crumb}</Link>
				</div>
			);
		});

	return <div className="breadcrumbs">{crumbs}</div>;
}
