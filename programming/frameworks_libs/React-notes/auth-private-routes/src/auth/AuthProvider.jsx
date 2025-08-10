/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/*
- fakeAuth: Our mock api for authentication
- AuthProvider: Our custom context provider for authentication related
  logic.

1. Create our custom context provider and supply the token, and login and logout functions.


+ Handling Auth's side of smart redirect:
1. We've been redirected so useLocation 
*/
import { createContext, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export const fakeAuth = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve("2342f2f1d131rf12"), 250)
    })

const AuthContext = createContext()
export function useAuthContext() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = async () => {
        const token = await fakeAuth()
        setToken(token)
        /*
        - If location.state.from exists, then we navigate to 
        that location as its the where the user was redirected.

        - Else by default, we take them to the dashboard. This 
        is good because there could be cases where they literally
        just went to our login page on our site, and so they
        didn't go to a protected route. As a result, 'from' 
        is not defined, so we default to logging into the dashboard.
        
        */

        const origin = location.state?.from || "/dashboard"

        navigate(origin)
    }
    const handleLogout = () => setToken(null)

    return (
        <AuthContext.Provider
            value={{
                token: token,
                onLogin: handleLogin,
                onLogout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
