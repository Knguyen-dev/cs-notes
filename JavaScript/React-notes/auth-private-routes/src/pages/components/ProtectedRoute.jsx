/*
- It would be <ProtectedRoute><Home/><ProtectedRoute/>
and that would make it so we'd validate whether they were
authenticated first before rendering the real content.

- Here the it will redirect us to the home page, but this 
  is obviously customizable.

+ Smart redirect:
1. We use the useLocation hook to track the current route, which
  would be the route that redirected the user and the one they 
  wanted to be on.
2. When we navigate the user to the login page, we send a state value
  to track where they were originally redirected from.
3. We set the state value in our navigate, and so the next route 
  will have a location object that has a state value. That state
  representing where we were redirected from.

- On logout:
1. Even on logout, ProtectedRoute goes through rendering process
  and records where we logged out from.


+ Review about useLocation:
1. Returns an object describing the current route or location. As
  you can tell, the value of the object changes everytime we change
  route. Using Navigation component and hook, we can also pass in
  a value for the state for the location object of where we're going.
  - hash: hash of current url
  - key: unique key of the location
  - pathname: current url
  - search:
  - state:
*/

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../auth/AuthProvider"

export default function ProtectedRoute({ children }) {
    const { token } = useAuthContext()
    const location = useLocation()

    // If not authenticated, redirect to home page, which is also login page.
    if (!token) {
        return (
            <Navigate
                to="/"
                replace={true}
                state={{ from: location.pathname }}
            />
        )
    }
    return children
}
