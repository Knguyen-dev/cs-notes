/* eslint-disable react/prop-types */

import BasicModal from "../common/BasicModal/BasicModal";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function NewUserModal({ open, onClose }) {
	// Define modal styles that can override our basic styles in BasicModal
	const modalStyles = {
		inputFields: {
			display: "flex",
			flexDirection: "column",
			marginTop: "20px",
			marginBottom: "15px",
			".MuiInput-root": {
				marginBottom: "20px",
			},
		},
	};

	// Holds all of your validation rules
	const validationSchema = Yup.object().shape({
		userId: Yup.string()
			.required()
			.min(6, "User ID must be at least 6 characters"),
	});

	const getContent = () => {
		return (
			<Box sx={modalStyles.inputFields}>
				<TextField
					placeholder="User ID"
					name="userId"
					label="User ID"
					required
				/>
				<TextField
					placeholder="Phone Number"
					name="phoneNumber"
					label="Phone Number"
					required
				/>
				<TextField placeholder="Email" name="email" label="Email" required />
			</Box>
		);
	};

	return (
		<BasicModal
			open={open}
			onClose={onClose}
			title="New User"
			subTitle="Fill out inputs and hit 'submit' button"
			content={getContent()}
			validate={() => {}}
		/>
	);
}
