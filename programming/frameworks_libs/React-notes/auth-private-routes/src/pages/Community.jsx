import { useAuthContext } from "../auth/AuthProvider"

export default function Community() {
    const { token } = useAuthContext()

    return (
        <div className="community-sectio">
            <p>Community Section (Protected)</p>
            <p>Authed as {token}</p>
        </div>
    )
}
