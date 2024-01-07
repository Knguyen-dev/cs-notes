/*
+ Creating a theme or global styles: 
  Here you can create a theme or global styles for our application. So
  when you don't apply sx props or anything extra, these css styles will
  take effect

1. Create a theme file where you'll define the theme. Here
  we're creating a theme for the dashboard
2. Then import this and use it in the ThemeProvider.


NOTE: Sx props take priority over theme props, which makes sense, but
  if you want a theme prop to take priority had "!important" at the end of the value.


- Theme doc locations:
1. Colors Docs: https://mui.com/material-ui/customization/palette/
2. Typography Docs: https://mui.com/material-ui/customization/typography/
*/

import { createTheme } from "@mui/material/styles";

// Theme style override: For overriding css styles
export const dashBoardTheme = createTheme({
	components: {
		// Name of the component

		// Targetting mui icons
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					fontSize: "1.7rem",
				},
			},
		},

		// Targeting Mui buttons
		MuiButton: {
			styleOverrides: {
				root: {
					// Styles for all Muibuttons
					fontWeight: 600,
					fontSize: "0.875rem",
					textTransform: "capitalize",
					borderRadius: 2.5,

					// Styles only for contained mui buttons
					"&.MuiButton-contained": {
						backgroundColor: "#009be5",
						// How to do pseudo-selectors such as hover
						"&:hover": {
							backgroundColor: "#006db3",
						},
					},

					// Styles only for outlined mui buttons
					"&.MuiButton-outlined": {
						color: "#fff",
						borderColor: "rgba(255, 255, 255, 0.7)",
						"&:hover": {
							backgroundColor: "transparent",
						},
					},
				},
			},
		},
	},

	/*
  + How to customize the color palette

  1. Here we're defining our 'primary' theme, so when you use color="primary" these
    will now apply. We have our contrast text white.
  - main: Main shade of color,
  - light: lighter shade of main
  - dark: darker shade of main.
  - contrastText: A text color that's going to contrast with main
  */

	palette: {
		white: {
			main: "#fff",
		},
	},

	// Here we can define text styles
	typography: {
		h1: {
			fontSize: "1.6rem",
			fontWeight: 600,
			color: "#fff",
			letterSpacing: "0.5px",
			textTransform: "capitalize",
		},

		// Defining a default font family
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});
