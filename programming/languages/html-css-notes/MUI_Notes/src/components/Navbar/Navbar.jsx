/*

+ Drawer: Just a sidebar

+ How to use:
1. Go to Drawer and open up the code. Copy the imports and copy the drawer 
  component from an example. Delete imports that aren't used
2. Define drawerWidth for the meantime.
3. We create our folder and file for our constants. We just plug in 
  our array of constants into the prebuilt markup because we want the 
  same look.



+ sx: Prop that lets you override styles and apply your own css rules.
1. We created an object in styles.js, and imported it here. And we 
  use that object and pass our defined styles to each component.


*/

// Mui imports
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// On click for each nav item, we redirect them to the associated route
import { useNavigate } from "react-router-dom";

// Constants and styles
import { mainNavbarItems } from "./const/navbarItems";
import { navbarStyles } from "./styles";
export default function Navbar() {
	const navigate = useNavigate();

	return (
		<Drawer
			// sx responsible for overiding styles, so we use it to customize our drawer
			sx={navbarStyles.drawer}
			variant="permanent"
			anchor="left">
			<Toolbar />
			<Divider />
			<List>
				{mainNavbarItems.map((itemObj) => (
					<ListItem key={itemObj.id} onClick={() => navigate(itemObj.route)}>
						<ListItemButton>
							<ListItemIcon sx={navbarStyles.icons}>
								{itemObj.icon}
							</ListItemIcon>
							<ListItemText sx={navbarStyles.text} primary={itemObj.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
