import AuthProvider, { useAuthContext } from "../auth/AuthProvider"
import { NavLink, Outlet } from "react-router-dom"

// Simple nav
const Navigation = () => {
    const auth = useAuthContext()

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="dashboard">Dashboard</NavLink>
            <NavLink to="community">Community</NavLink>
            {auth.token && (
                <button type="button" onClick={auth.onLogout}>
                    Sign Out
                </button>
            )}
        </nav>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <div className="root-layout">
                <h1>React Router</h1>
                <Navigation />
                <Outlet />
            </div>
        </AuthProvider>
    )
}
