/*
+ MUI Grid: Uses flexbox, a grid is a flex item. It has 5 breakpoints xs, sm, md, lg, and xl. 
  A grid row has 12 available columns like bootstrap. So here on xs to larger screens it takes 8 columns.

  So right now, our AppLayout is the grid, which lets us define these grid items.


+ How to override styles in MUI  (Using sx prop):
1. Create an object with your styles.
2. For hover effects and pseudo selection use &.
3. Pass that object of styles to your component.


*/

import { useState } from "react";
// Mui imports
import { Box, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

// Custom components
import BasicCard from "../../components/common/BasicCard/BasicCard";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import NewUserModal from "../../components/modals/NewUserModal";

// Styles
import { cardHeaderStyles } from "./styles";

export default function Authentication() {
	const [open, setOpen] = useState(false);

	// Header of auth page
	const getHeader = () => {
		const handleChange = (value) => {
			console.log(value);
		};

		const addUser = () => {
			setOpen(true);
		};

		console.log("Set OPen: ", open);

		return (
			<Box sx={cardHeaderStyles.wrapper}>
				<SearchBar
					placeholder="Search by email, address, etc."
					onChange={(e) => handleChange(e.target.value)}
					searchBarWidth="720px"
				/>

				{/* Button section */}
				<Box>
					<CommonButton
						variant="contained"
						onClick={addUser}
						size="large"
						sx={cardHeaderStyles.addUserButton}>
						Add user
					</CommonButton>
					<IconButton>
						<RefreshIcon />
					</IconButton>
				</Box>
			</Box>
		);
	};

	// Content of the auth page
	const getContent = () => (
		<Typography
			align="center"
			sx={{
				margin: "40px 16px",
				color: "rgba(0, 0, 0, 0.6)",
				fontSize: "1.3rem",
			}}>
			No users for this project yet
		</Typography>
	);

	return (
		<GridWrapper>
			<BasicCard header={getHeader()} content={getContent()} />
			<NewUserModal open={open} onClose={() => setOpen(false)} />
		</GridWrapper>
	);
}
