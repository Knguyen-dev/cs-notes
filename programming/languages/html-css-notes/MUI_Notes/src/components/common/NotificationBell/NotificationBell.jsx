/* eslint-disable react/prop-types */
/*
+ A custom icon button with a badge


+ New concepts:
1. Icon buttons: 
2. Badges: Same as bootstrap badges
3. Tooltips: Wrap tool tip around the thing you want it to appear on and put a title.


*/

import { IconButton, Badge } from "@mui/material";
import BasicMenu from "../BasicMenu/BasicMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CommonToolTip from "../CommonToolTip/CommonToolTip";
import { useState } from "react";

// List of notifications, or items in our menu
const notifications = [
	{
		id: 0,
		label: "First notification",
	},
	{
		id: 1,
		label: "Second notification",
	},
];

export default function NotificationBell({ iconColor }) {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const newNotifications = `You have ${notifications.length} new notifications!`;
	const noNotifications = "No new notifications";

	/*
  + handles logic for opening a drop down menu
  1. Button that was clicked is now the anchor for the menu. 
    Allowing us to pass this to any button.
  2. Then open the menu

  NOTE: As a result, we can link the NotificationBell button
  to our Basic menu by having the anchor be the the NotificationBell 
  button.
  
  */
	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	// Closes menu
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<CommonToolTip
				title={notifications.length ? newNotifications : noNotifications}>
				<IconButton color={iconColor} onClick={handleOpen}>
					<Badge badgeContent={notifications.length} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
			</CommonToolTip>

			<BasicMenu
				open={open}
				anchorEl={anchorEl}
				handleClose={handleClose}
				menuItems={notifications}
			/>
		</div>
	);
}
