/*
+ Here we want to fetch a bunch of careers from a 'data source'

- Typical way: You'd have an effect that'd run after rendering 
  that would fetch the data, then you'd store the data in a state
  and render the data with that state.

- Using loaders: Here you don't even need to use an effect to 
  fetch the data, nor need a state to store the data to render
  it in your component


+ When completing the route and component for route parameters:
1. Since we can now do "careers/some_id", we can set our links to 
	route to their individual career details. Since on the routing 
	we're nested below 'careers', to make it so our links go to 'careeres/some_id'
	we can just put 'id' as the value.
2. careerObj.id is an integer so make it a string as well.
 
*/

import { useLoaderData, Link } from "react-router-dom";
export default function Careers() {
	const careers = useLoaderData();
	return (
		<div className="careers">
			{careers.map((careerObj) => (
				<Link to={careerObj.id.toString()} key={careerObj.id}>
					<p>{careerObj.title}</p>
					<p>{careerObj.location}</p>
				</Link>
			))}
		</div>
	);
}

/*
+ How to create a loader:
1. Define a function outside of our target component.

- loader function
1. Fetch data from our api endpoint (Json-server in this case)
2. Return a promise that resolves to the json data.
3. Export it so that we will be able to associate it with a route. 
4. Associate this loader with a route in App component.
  Now whenever users go on "/careers" route, careersLoader will run before
  hand and fetch our career json data.
5. To access that data in our component, use react-router's hook 
  useLoaderData(), which will resolve the promise and return your data

- NOTE: Remember async functions return a promise that resolve to the return value
*/
// eslint-disable-next-line react-refresh/only-export-components
export const careersLoader = async () => {
	const response = await fetch("http://localhost:4000/careers");
	return response.json();
};
