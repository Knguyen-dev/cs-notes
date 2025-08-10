/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

/*
+ Validation schema: Again we use yup for helping us with 
  our client side validation. In your validation schema
  make sure your keys match the ones that we'll register
  the inputs with.

- NOTE: 
  1. You could use react-hook-form's builtin validation, but 
  it's recommended that you use yup or another library that's specifically
  created and used for validation. Here it's a lot easier to customize 
  what our error messages show, and for something like validating an email
  we don't need to make our own regex for that.

  2. Axios is just a library for fetching data. It's not actually an important
    part of these notes, you could also use fetch instead of you want.
  */
const validationSchema = yup.object({
	username: yup.string().required("Missing username"),
	email: yup
		.string()
		.required("Missing email")
		.email("Not a valid email format!"),
	password: yup.string().required("Missing password"),
});

export default function RegisterForm() {
	/*
  - Default values: It's convention to usually define
    our default values for our fields. Remember to match
    these keys with the ones that you use to actually
    register the inputs fields with.
  
  - errors: To access those error messages you must destructure
    it. So if a field has an error when validating, then the errors
    object will have it.

  */
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	/*
  - setError: Here we use setError to show what it can look like when we want 
    to set the error messages to the error messages sent by our server.
  
  */
	const onSubmit = async (data) => {
		console.log(data);

		try {
			// Make a post request to your backend to register a user

			const response = await axios.post("https://api.realworld.io/api/users", {
				user: data,
			});

			// Then obviously get the json and set your data if this was a real project.
		} catch (err) {
			console.log(err);

			/*
      + If request goes wrong. In this case we're using axios so they're 
      all in the catch block, but when !response.ok, then you'd set an error for 
      all of the fields you got the error for. So here when registering, 
      assuming your backend rest api sends an error object, you'd use the errors on that error object.
      
      - NOTE: Method is pretty good for something like a registration form, where you could have errors
        being sent back for multiple things such as email or username is taken. If your server is sending 
        back an error where it doesn't pertain to a certain field or something then we got it covered.

      + Global server error: Let's say it's a status code 400 "Username or password incorrect" you 
        can register it under "root.serverError", or if something generic happened like your server
        failed to connect you could do "root.serverError" amd put something went wrong. Of course
        you'd have to clear it on next submission, but that's still pretty good.


      */

			// If there's an error with the 'email' field sent by backend
			// then set the error of that field, indicate it as a server error,
			// Finally, set the error message.
			if (err.response.data.errors.email) {
				setError("email", {
					type: "server",
					message: err.response.data.errors.email[0],
				});
			}

			if (err.response.data.errors.username) {
				setError("username", {
					type: "server",
					message: err.response.data.errors.username[0],
				});
			}

			if (err.response.data.errors.password) {
				setError("password", {
					type: "server",
					message: err.response.data.errors.password[0],
				});
			}
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<div className="field">
				<label className="label">Username</label>
				<input {...register("username")} type="text" className="input" />
				{errors.username && (
					<span className="error">{errors.username.message}</span>
				)}
			</div>
			<div className="field">
				<label className="label">Email</label>
				<input {...register("email")} type="text" className="input" />
				{errors.email && <span className="error">{errors.email.message}</span>}
			</div>

			<div className="field">
				<label className="label">Password</label>
				<input {...register("password")} type="text" className="input" />
				{errors.password && (
					<span className="error">{errors.password.message}</span>
				)}
			</div>
			<div>
				<button type="submit" className="button">
					Register
				</button>
			</div>
		</form>
	);
}
