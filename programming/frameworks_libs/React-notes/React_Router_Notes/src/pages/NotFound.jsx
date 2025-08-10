import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div>
			<h2>Page not found!</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus at
				harum sit voluptas quia itaque eaque tenetur ex quo! Sit omnis vitae
				officiis quisquam iste.
			</p>
			<p>
				Go to the <Link to="/">Home Page</Link>.
			</p>
		</div>
	);
}
