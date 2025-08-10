/* eslint-disable react/prop-types */
/*
- How does it work:
1. We authenticate with an API such as GraphQL, Rest, or Firebase. The api returns a 
	token after a good authentication and react-router will take hte role of redirecting the 
	user after login. In our example, we'll use a mock function that poses as an api
2. We'll have a 'sign in' button on the Home page. Create a function to handle a 
	login, so we fetch a token and set the auth token to a state. In the real 
	world you may have a "JWT" token that has more info such as username and email.

3. We'll have a function for logout as well, and our nav takes a token and our logout
	function. With a real backend, sometimes we'll call the api for logging out. We will
	say if the token exists the user is logged in, so the nav will show a sign out button.

4. Of course to follow best practices isolate all of our authentication
	logic into a custom context provider and a custom hook to access the values
	of that provider.



5. Start using react router for redirects. Get useNavigate, and make it 
	so when logging in, on success the user is navigated to the dashboard.

6. Now let's use protected/private routes. If user is unauthenticated
	and trying to go to a protected page, we take them back to our 
	login page, which is the home page in this case. Notice how we 
	create the protected routes in myRouter instead of doing validation
	in the components themselves. Now when users logout, the token is 
	null, then we are validated in ProtectedRoute that wraps Dashboard.
	We aren't authenticated so we are redirected.

7. In modern applications, if you visit a protected route, you get login 
	screen, but after you login, you are then redirected to the original 
	route you wanted. To do smart redirect, we need to remember what 
	route the redirect occurred, because that's the route they want. 
	Let's implement this in our ProtectedRoute component


*/
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Community from "./pages/Community"
import NoMatch from "./pages/NoMatch"

import RootLayout from "./pages/RootLayout"

import ProtectedRoute from "./pages/components/ProtectedRoute"

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "community",
                element: (
                    <ProtectedRoute>
                        <Community />
                    </ProtectedRoute>
                ),
            },
            { path: "*", element: <NoMatch /> },
        ],
    },
])

// Simple app with our routes made
export default function App() {
    return <RouterProvider router={myRouter} />
}
