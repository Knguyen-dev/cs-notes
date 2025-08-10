import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import { useState, useEffect } from "react";
import BasicSnackbar from "../../components/common/BasicSnackbar/BasicSnackbar";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import Loading from "../../components/common/Loading/Loading";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import UserTable from "../../components/common/UserTable/UserTable";

export default function Storage() {
	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(true);

	const handleClick = () => {
		setOpen(true);
	};

	/*
  - Here we make sure a clickaway wouldn't close the snackbar.
  We know that the onClose function returns an event, and a reason string,
  and the reason can be 'timeout' 'clickaway' or 'escapeKeyDown' because 
  of the API docs helping us out.
  */
	const handleClose = (e, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	// Stop loading after three seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);
		return () => clearTimeout(timer);
	});

	return (
		<GridWrapper>
			This is Storage page
			{loading ? (
				<Loading>
					<CommonButton variant="contained" onClick={handleClick}>
						Open success snackbar
					</CommonButton>
				</Loading>
			) : (
				<CommonButton variant="contained" onClick={handleClick}>
					Open success snackbar
				</CommonButton>
			)}
			<BasicSnackbar
				open={open}
				onClose={handleClose}
				severity="success"
				message="Success Message"
			/>
			<BasicCard content={<UserTable />} />
		</GridWrapper>
	);
}
