import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import useAuthContext from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AppLayout from "./layouts/AppLayout";

function App() {
	/*
  + Protecting client side routes:
  - We'll use authContext and user to do protected routes. If
    the user is defined, they're logged in, else they aren't. So
    if the user is already logged in and they try to go to the 'login'
    or 'signup' page, we'll render the Home page component instead.
  
  - NOTE: This is a simple way of doing it. If you wanted smart redirects then
    obviously you'd implement a ProtectedRoute component, which we've done 
    in our GamerCity ShoppingCart Application.
  
  */
	const { user } = useAuthContext();

	const appRouter = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<AppLayout />}>
				{/* 

        - Auth and protecting the client side route.
        1. If going to  the index route, if user is logged in, render home page, else redirect them to the login route.
          Notice that if you're logged in and on the home page, once you log out, it redirects us to the login page
          automatically. Remember, our logging out changes the user global state, causing an app-level re-render.

        2. If going to the login route, if there's not a user, then yeah render the login
          page. Else if there is a user, navigate to the index/home page.
        
        3. So if they're not logged in, render the sign up page, else if they're already logged in just take them 
          to the home page.


        */}
				<Route index element={user ? <Home /> : <Navigate to="/login" />} />

				<Route
					path="/login"
					element={!user ? <Login /> : <Navigate to="/" />}
				/>
				<Route
					path="/signup"
					element={!user ? <Signup /> : <Navigate to="/" />}
				/>
			</Route>
		)
	);

	return <RouterProvider router={appRouter} />;
}

export default App;
