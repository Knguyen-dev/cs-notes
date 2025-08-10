/* eslint-disable react/prop-types */
import { useAuthContext } from "../auth/AuthProvider"
/*
+ Public route, but if they're already logged in, then we 
don't need to show a 'signin 

*/
export default function Home() {
    const auth = useAuthContext()
    return (
        <div className="Home">
            <h1>Home Page (Public)</h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate amet iste quae officiis necessitatibus, quisquam nisi.
            </p>
            {!auth.token && <button onClick={auth.onLogin}>Sign In</button>}
        </div>
    )
}
