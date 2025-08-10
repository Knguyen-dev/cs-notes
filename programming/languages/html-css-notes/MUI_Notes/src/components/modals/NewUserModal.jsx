/* eslint-disable react/prop-types */

import BasicModal from "../common/BasicModal/BasicModal";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";

// Represents the values for our forms
// Hey maybe you want default input sometimes
const defaultInputValues = {
	userId: "",
	email: "",
	phoneNumber: "",
};

const NewUserModal = ({ open, onClose, addNewUser }) => {
	// State to track form values
	const [values, setValues] = useState(defaultInputValues);

	const modalStyles = {
		inputFields: {
			display: "flex",
			flexDirection: "column",
			marginTop: "20px",
			marginBottom: "15px",
			".MuiFormControl-root": {
				marginBottom: "20px",
			},
		},
	};

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	/*
  - Object with validation rules and corresponding error messages 
    that will appear on form.
  */
	const validationSchema = Yup.object().shape({
		userId: Yup.string()
			.required("User ID is required")
			.min(6, "User ID must be at least 6 characters"),
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid."),
		phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
	});

	/*
  register: Establishes connection between input field and form state
    managed by react. At this point react only knows 'userId' 'email' and
    'phoneNumber', which are keys for input fields and it only knows 
    their validation rules. By using {...register("userId")} we let react
    know what form field it should be looking at to validate that schema
    with and show error messages for.

  handleSubmit: function for submitting form. If there are no errors 
    handleSubmit will execute.
  formState: state that tracks form errors 

  NOTE: Honestly don't worry about tihs too much just focus on the MUI.
  */
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const addUser = (data) => {
		addNewUser(data);
	};

	const handleChange = (value) => {
		setValues(value);
	};

	/*
  + Effect ensures form fields are cleared on open of the modal.
    Remember NewUserModal isn't actually the modal itself, it is 
    just a component, like a filler component. When modal disappears this 
    is still being rendered.
  
  */
	useEffect(() => {
		if (open) setValues(defaultInputValues);
	}, [open]);

	const getContent = () => (
		<Box sx={modalStyles.inputFields}>
			<TextField
				placeholder="User ID"
				name="userId"
				label="User ID"
				required
				{...register("userId")}
				error={errors.userId ? true : false}
				helperText={errors.userId?.message}
				value={values.userId}
				onChange={(event) =>
					handleChange({ ...values, userId: event.target.value })
				}
			/>
			<TextField
				placeholder="Email"
				name="email"
				label="Email"
				required
				{...register("email")}
				error={errors.email ? true : false}
				helperText={errors.email?.message}
				value={values.email}
				onChange={(event) =>
					handleChange({ ...values, email: event.target.value })
				}
			/>
			<TextField
				placeholder="Phone number"
				name="phoneNumber"
				label="Phone number"
				required
				{...register("phoneNumber")}
				error={errors.phoneNumber ? true : false}
				helperText={errors.phoneNumber?.message}
				value={values.phoneNumber}
				onChange={(event) =>
					handleChange({ ...values, phoneNumber: event.target.value })
				}
			/>
		</Box>
	);

	return (
		<BasicModal
			open={open}
			onClose={onClose}
			title="New user"
			subTitle="Fill out inputs and hit 'submit' button."
			content={getContent()}
			onSubmit={handleSubmit(addUser)}
		/>
	);
};

export default NewUserModal;
