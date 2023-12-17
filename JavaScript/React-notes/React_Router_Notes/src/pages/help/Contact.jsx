import { Form, redirect, useActionData } from "react-router-dom";

export default function Contact() {
	const data = useActionData();

	return (
		<div className="contact">
			<h3>Contact Us</h3>

			<Form method="post" action="/help/contact">
				<label>
					<span>Your Email</span>
					<input type="email" name="email" required />
				</label>
				<label>
					<span>Your Message</span>
					<textarea name="message" required></textarea>
				</label>
				<button type="submit">Submit</button>

				{data && data.error && <p>{data.error}</p>}
			</Form>
		</div>
	);
}

/*
+ Creating an action function:
1. Remember it's on the front end, is not an actual post request but kind of like a mock.
	Later we'll be able to see what kind of request it was in our action function.
2. Create an 'action', which is a function that fires when a form is submitted.
	We specify a route path here, so we specified the route of this page, or the route this component 
	renders on. We do this because later we'll define an 'action' function and link it to this route, so 
	react-router will find and run the action function associated with route "/help/contact". Then in
	route for "help/contact" we do action={someActionFunction}.
3. request: Contains all of the form data, so all input values. Note that 
	all input elements must have a 'name' attribute for this to work, as we use those
	names to access the values of the form.
4. Get form data with request.formData(), and data.get(inputName).
5. For an action, we have to return a redirect.




NOTE: In a real form, you'd use the request object to get the type of 
	request made such as 'post', and you'd get the submission data and
	actually try to save it to a database, so that's why we define method.
*/
// eslint-disable-next-line react-refresh/only-export-components
export const contactAction = async ({ request }) => {
	const data = await request.formData();
	const submission = {
		email: data.get("email"),
		message: data.get("message"),
	};

	/* 
	- Send Post request to api or save it to a database.
	1. However, there could be cases where our server comes back with an 
		error, such as saying the message isn't long enough or something.
	2. We'll simulate that error handling here. If our message is less than 
		10 characters, we'll return an object with attribute 'error' as the error message.
	3. We'll access that error message in the component using 'useActionData'		
	4. As a result, when the message is less than 10 characters long, we're going to 
		return an error, which is then given to our component with (useActionData). Then we 
		just show our error message on the screen in the form. We don't get 
		redirected or go anywhere in this case.
	*/

	if (submission.message.length < 10) {
		return {
			error: "Message must be over 10 chars long.",
		};
	}

	// On Successful form submission, we redirect them back to home page
	return redirect("/");
};
