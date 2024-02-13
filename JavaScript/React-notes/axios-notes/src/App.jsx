import Title from "./components/Title";

// import FirstRequest from "./examples/1-first-request";
// import Headers from "./examples/2-headers";
// import PostRequest from "./examples/3-post-request";

// Runs the code in that file, which sets up our global axios configurations.
// import "./axios/global";
// import GlobalInstance from "./examples/4-global-instance";

import Interceptors from "./examples/6-interceptors";

export default function App() {
	return (
		<main>
			<Title />

			<Interceptors />
		</main>
	);
}
