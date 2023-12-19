import { useAuthContext } from "../auth/AuthProvider"

export default function Dashboard() {
    const auth = useAuthContext()
    return (
        <div className="Home">
            <h2>Dashboard (Protected)</h2>
            <p>Authenticated as {auth.token}</p>
        </div>
    )
}
