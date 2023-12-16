/*
+ Here we show a somewhat old way of doing routes. Now React Router Dom has new  ways, and this isn't
	outdated, but here I want to show the original way of making the routes that will likely
	still be seen in older code.

- BrowserRouter: Routes our entire application and makes things work
- Routes and Route: Allows us to set up routes 
- Link and NavLink: Use to create links to different pages, which both allow react router dom to 
  intercept requests for new html files. As a result we're able to render new page content but 
  still use a single page. The difference between them is that a NavLink gets an active class
  put on it when the component it links to is being rendered, allowing for more styling options.


- How it works:
1. Wrap everything in a BrowserRouter. We have a main tag since because we want our pages to be
  rendered within a 'main' tag.
2. In the Routes component, we define our routes and what they do.
3. At the root or index url, React router renders the markup for the Home component in the main tag.
	NOTE: Instead of path="/" you can just put "index", which does the same thing 

4. At the /about url, we render the markup of the About component in the main tag.
	NOTE: You can keep it as "about" instead of "/about", React is smart and knows what 
	you're talking about

5. While our header stays constant, the 'main' tag is where our new pages are always being 
	rendered in.
*/

import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<header>
				<nav>
					<h1>JobaRouter</h1>
					<NavLink to="/">Home</NavLink>
					<NavLink to="about">About</NavLink>
				</nav>
			</header>

			<main className="app">
				<Routes>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}
export default App;
