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
	const [users, setUsers] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [searchResults, setSearchResults] = useState(users);

	const getHeader = () => {
		const handleSearch = (value) => {
			filterData(value);
		};

		/*
    - value will be username, email or id. We lowercase 
      the input value and remove any space. If its an
      empty string, set users to searchResults, which 
      by default is the users, making it so if searchbar 
      is empty we should all users.

      - Else:
      1. Look through all keys in searchResults (essentially an array of users)
      2. Stringify a user object, and checks if its includes our searched value.
        Only return users with the matching value. and setUsers (the displayed)
        users to our filtered users.

    */
		const filterData = (value) => {
			const lowercasedValue = value.toLowerCase().trim();
			if (lowercasedValue === "") setUsers(searchResults);
			else {
				const filteredData = searchResults.filter((item) => {
					return Object.keys(item).some((key) =>
						item[key].toString().toLowerCase().includes(lowercasedValue)
					);
				});
				setUsers(filteredData);
			}
		};

		const openModal = () => {
			setOpen(true);
		};

		return (
			<Box sx={cardHeaderStyles.wrapper}>
				<SearchBar
					// On change it will run our search function
					// For dynamic searching
					placeholder="Search by email address, phone number, or user UID"
					onChange={(event) => handleSearch(event.target.value)}
					searchBarWidth="720px"
				/>
				<Box>
					<CommonButton
						variant="contained"
						onClick={openModal}
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

	// Add user to
	const addNewUser = (data) => {
		users.push({ ...data });
		setOpen(false);
	};

	const getContent = () => (
		<>
			{/* If there are users show me, else show message saying its empty  */}
			{users.length ? (
				users.map((user, index) => (
					<Box key={index} sx={{ marginBottom: "20px" }}>
						<Typography>User ID: {user.userId}</Typography>
						<Typography>Email: {user.email}</Typography>
						<Typography>Phone Number: {user.phoneNumber}</Typography>
					</Box>
				))
			) : (
				<Typography
					align="center"
					sx={{
						margin: "40px 16px",
						color: "rgba(0, 0, 0, 0.6)",
						fontSize: "1.3rem",
					}}>
					No users for this project yet
				</Typography>
			)}
		</>
	);

	return (
		<GridWrapper>
			<BasicCard header={getHeader()} content={getContent()} />
			<NewUserModal
				open={open}
				onClose={() => setOpen(false)}
				addNewUser={addNewUser}
			/>
		</GridWrapper>
	);
}
