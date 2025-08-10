/*
+ Put the styles of our navbar in its own file to make main 
  component file cleaner. Here just define clear css style names
  so that you remember which styles go where. So here 
  we have separate styles for the drawer itself, the icons, and the 
  text on the drawer.

*/

export const navbarStyles = {
	drawer: {
		width: 320,
		flexShrink: 0,

		// Targets .MuiDrawer-paper within the drawer styles.
		// & refers to parent selector, so it allows us to do nested rules like this.
		// Only target .MuiDrawer-paper in the & (drawer) styles.
		"& .MuiDrawer-paper": {
			width: 320,
			boxSizing: "border-box",
			backgroundColor: "#101F33",
			color: "rgba(255, 255, 255, 0.7)",
		},
		"& .Mui-selected": {
			color: "red",
		},
	},
	icons: {
		color: "rgba(255, 255, 255, 0.7)!important",
		marginLeft: "20px",
	},
	text: {
		"& span": {
			marginLeft: "-10px",
			fontWeight: "600",
			fontSize: "16px",
		},
	},
};
