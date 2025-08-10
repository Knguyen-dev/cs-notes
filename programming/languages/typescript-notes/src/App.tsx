import "./styles.css";
const Greeting = (message: string) => {
	return <h1>{message}</h1>;
};

export default function App() {
	return (
		<div className="App">
			{Greeting("Hello World")}
			<h2>Start editing to see some magic happen!</h2>
		</div>
	);
}
