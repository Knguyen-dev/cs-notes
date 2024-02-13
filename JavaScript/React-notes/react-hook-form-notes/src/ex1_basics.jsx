import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

/*
+ React Hook Form:

- register: Registers input fields in react hook form. So when registering
  we register the input with a name, or 'key'. So doing {..register("my-field")}
  would make it so react hook form has a form values object that looks like 
  this => {
    "my-field": "some-field-value"
  }
  So, we register the fields with the 'keys' we want to access them with. Basically
  the same idea of putting 'name' attributes on input fields, and how that affects 
  how you'd access those in a request object's body via the key. 


- handleSubmit: By wrapping this around your real onSubmit function, 
  react-hook-form's handle submit will deal with all of the form validation
  before we run our real submission logic. The handleSubmit will pass in
  'data' to our real onSubmit function, which is the object of 
  field keys and values from our form. 
  {
    field1: "field-one-value",
    field2: "field-two-value",
    etc..
  }


- formState: {errors}: You can use this to get an error map
  that tracks errors of all of the input fields that you've 
  registered. It will only have keys for fields that 
  have errors => 
  {
    field1: "Field 1 error",
    field2: "Field 2 error"
  }



+ Yup:
- Now we'll use yup to generate validation schemas or plans to 
  to shape and validate what our form data should look like.

1. We know that our 'data' we get back is going to be an object.
  An object of the field keys and values. Then with .shape()
  we'll define what the object looks like. Here we'll match the 
  field names we put with react-hook-form. 

2. Now just pass in yupResolver to the 'resolver', which helps
  the linking between react-hook-form and the validation schema that 
  we've created.

3. You can also customize what error messages will appear based on 
  what errors are raised. Also it should be noted after one failed submission, 
  that 'errors' object is defined, and also the form will display errors in
  real time to indicate to the user whether their input is correct or not.

- Takeaway: As a result, if the form is being submitted
  without passing these checks, then our onSubmit function
  that contains our real logic will not execute! So that's 
  handleSubmit validating  with our yup schema in mind before
  running our onSubmit function.


- NOTE: You should always validate your data both on 
  the front end and the backend. Here we're doing 
  the frontend, but that doesn't mean you can neglect
  server-side form validation.

*/

function Form1() {
	const schema = yup.object().shape({
		fullName: yup.string().required("Full name can't be blank!"),
		email: yup
			.string()
			.email("Come on, that isn't a valid email!")
			.required("Your email is required!"),
		age: yup
			.number()
			.positive()
			.integer()
			.min(18)
			.required("Enter a valid age"),
		password: yup
			.string()
			.min(4, "At least four characters dude")
			.max(20, "Okay you can't be over 20 characters")
			.required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Passwords don't match!")
			.required("You have to retype the password!"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Full name..." {...register("fullName")} />

			{/* If errors.fullName is defined, access the message property. So if 
          there's an error with the fullName field, we display our error message for 
          that particular field*/}
			{errors.fullName && <p>{errors.fullName.message}</p>}

			<input type="email" placeholder="Email..." {...register("email")} />
			{errors.email && <p>{errors.email.message}</p>}

			<input type="number" placeholder="Age..." {...register("age")} />
			{errors.age && <p>{errors.age.message}</p>}

			<input
				type="password"
				placeholder="Password..."
				{...register("password")}
			/>
			{errors.password && <p>{errors.password.message}</p>}

			<input
				type="password"
				placeholder="Confirm Password..."
				{...register("confirmPassword")}
			/>
			{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
			<button type="submit">Submit</button>
		</form>
	);
}

export { Form1 };
