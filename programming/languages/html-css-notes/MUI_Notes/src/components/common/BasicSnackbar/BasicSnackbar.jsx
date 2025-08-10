/* eslint-disable react/prop-types */
/*
+ Snackbar: A brief notification bar that appears temporarily. Only one snackbar
  may be dispyed at a time.


*/

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { snackbarStyles } from "./styles.js";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BasicSnackbar({ open, onClose, severity, message }) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={onClose}
			sx={snackbarStyles}>
			<Alert onClose={onClose} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
}
