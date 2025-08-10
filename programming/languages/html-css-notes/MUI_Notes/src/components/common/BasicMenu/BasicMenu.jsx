/* eslint-disable react/prop-types */
/*
+ Menu: Kind of like a drop down:
1. open: if true, menu is open
2. anchorEl, html element used to set positno of menu from button
3. handleClose: Function used to close the menu


+ Menu Docs: https://mui.com/material-ui/react-menu/

+ BasicMenu: We're making a reusable menu component. We'll use it 
  in our NotificationBell button.

*/

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
	return (
		<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
			{menuItems.map((item) => (
				<MenuItem key={item.id}>{item.label}</MenuItem>
			))}
		</Menu>
	);
}
