/*
- useParams: Function we use to destructure the parameters
  we defined for the route.


+ How to set up route parameter:
1. Set up your route with parameters in App.
2. Then destructure useParams, and get the various parameters you defined
  in the route in step 1.

+ Setting up loader again:
- Now for us to fetch the data for this specific 'Career', a good
  idea is to use a loader function that receives all of the route
  parameters and uses them to access specified data.
1. Let loader function accept 'params', an object of 
  route parameters and their values.
2. Destructure object to get the values of all route parameters.
3. Do fetch request on our endpoint, and we just concatenate the id
  associated with our career object.
4. Given that we've linked our loader to our route, get that loader 
  data with useLoaderData() so that our component can access it.
5. As a result, when the user goes to careers/insert_some_id, the loader 
  function will fetch the appropriate career data, allowing our component 
  to dynamically render that career data for any defined career ID.

useParams(): Will return an object of parameters defined on route and their values.
  Useful as you can destructure it for the parameter values, and use them.


*/

import { useLoaderData, redirect } from "react-router-dom";

export default function CareerDetails() {
	const career = useLoaderData();

	return (
		<div className="career-details">
			<h2>Career details for {career.title}</h2>
			<p>Starting salary: {career.location}</p>
			<p>Location: {career.location}</p>
			<div className="details">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
					rerum error. Assumenda, nisi beatae! Error in adipisci ad esse
					voluptate?
				</p>
			</div>
		</div>
	);
}

/*
- Loader function

- Issue: Now that we've set up route parameters for career id, users 
  may try to go to a route that has an undefined id such as "career/200". 
- Solution: Use redirects to redirect them.

+ Redirects: You can return or throw responses from loaders, you can also 
  use redirect to redirect the user to another route. It's recommended to 
  use 'redirect' over 'useNavigate' when in 'loaders' and 'actions'. Here
  it's better as we are responding to data being fetched. 

1. As a result, when fetch fails, we return a redirect call and 
  we redirect to careers/career-not-found, which is not a defined route. 
2. As a result we are actually redirecting to the 'page not found' catch all route 
  we created, so when users try to go to an undefined career, they'll be redirected
  to our custom 404 page.


+ Review on http and requests: Typically doing a request "somepage/products/2" 
  the by default is recognized as a resource with id of 2, so you don't have 
  to do "id=2". For other things such as 'color' you'd have to od "color=blue" 
  since id is a common url parameter.


*/
// eslint-disable-next-line react-refresh/only-export-components
export const careerDetailsLoader = async ({ params }) => {
	try {
		const { id } = params;
		const response = await fetch("http://localhost:4000/careers/" + id);

		if (!response.ok) {
			throw new Error("Failed fetching career data!");
		}
		return response.json();
	} catch (error) {
		console.error("Fetch Error:", error);

		return redirect("career-not-found");
	}
};
