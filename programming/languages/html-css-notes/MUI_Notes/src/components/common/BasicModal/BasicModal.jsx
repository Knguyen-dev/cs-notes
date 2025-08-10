/* eslint-disable react/prop-types */

import { Box, Modal, Typography } from "@mui/material";
import CommonButton from "../CommonButton/CommonButton";
import { modalStyles } from "./style";

const BasicModal = ({ open, onClose, title, subTitle, content, onSubmit }) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={modalStyles.wrapper}>
				<Typography variant="h6" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mt: 2 }}>{subTitle}</Typography>
				{content}
				<Box sx={modalStyles.buttons}>
					<CommonButton variant="contained" onClick={onSubmit}>
						Submit
					</CommonButton>
					<CommonButton onClick={onClose}>Cancel</CommonButton>
				</Box>
			</Box>
		</Modal>
	);
};

export default BasicModal;
