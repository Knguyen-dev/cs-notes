import { useState } from "react";
import { Navigate } from "react-router-dom";

/*
+ Navigate component:
1. Here we simulate having a user and logging out.
2. The idea is that when the user clicks the logout button, the user will be null
	so instead of returning the markup for the about page, we redirect the user to the home page.
3. Do that with a conditional, and set replace={true}, so that even if the user tries to go 
	back via the browser history, it won't work as it replaces the about page with the '/' home
	page in the history. So the home page replaces the about page in the history.

	For example: Home -> Help -> About(logged out) -> Home; Going back in the history would actually take them to before 'About'
	so back to the Help page. This makes sense because replacement makes the routing look like
	Home -> Help -> Home(previously about) -> Home, which simplifies to Home -> Help -> Home, so going 
	back on "Home" leads to 'Help' page if that makes sense.

NOTE: This is just a simple example as you notice we can still go to click back on the about page after.
	Also you can add a 'state' attribute, which again, allows you to send data from one page/route to 
	another.

*/

import { useOutletContext } from "react-router-dom";

export default function About() {
	const [user, setUser] = useState("Mario");

	const outletData = useOutletContext();

	console.log(outletData.x);

	if (!user) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<div className="about">
			<h2>About Us!</h2>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
				quisquam sequi eos modi tenetur voluptate eum id placeat reprehenderit.
				Ducimus eos cum sed hic nesciunt temporibus provident officia ab
				debitis.
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
				quisquam sequi eos modi tenetur voluptate eum id placeat reprehenderit.
				Ducimus eos cum sed hic nesciunt temporibus provident officia ab
				debitis.
			</p>
			<button onClick={() => setUser(null)}>Logout</button>
		</div>
	);
}
