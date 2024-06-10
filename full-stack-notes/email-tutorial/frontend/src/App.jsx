import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import VerifyEmailPage from "./components/VerifyEmail";
import EmailPage from "./components/Email"
import "./index.css";

function App() {
    const appRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route  path="/">
                <Route index element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="verify-email/:token" element={<VerifyEmailPage />} />
                <Route path="email" element={<EmailPage/>} />
            </Route>
        )
    );

    return <RouterProvider router={appRouter} />;
}

export default App;
