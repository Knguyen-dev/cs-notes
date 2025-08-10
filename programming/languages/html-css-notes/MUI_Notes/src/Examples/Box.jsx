/*
+ Box: Generic container for grouping content and other containers.
  Good for small content, rather than being wrapped around entire 
  pages. For that you'd probably use container.
*/

import { Box, ThemeProvider } from "@mui/material";

// Box renders out a section
function Box1() {
	return (
		<Box component="section" sx={{ border: "1px dashed grey" }}>
			This is a section container
		</Box>
	);
}

function Box2() {
	return (
		<ThemeProvider
			theme={{
				palette: {
					primary: {
						main: "#007FFF",
						dark: "#0066CC",
					},
				},
			}}>
			<Box
				sx={{
					width: 100,
					height: 100,
					borderRadius: 1,
					bgcolor: "primary.main",
					"&:hover": {
						bgcolor: "primary.dark",
					},
				}}>
				My Box
			</Box>
		</ThemeProvider>
	);
}

export { Box1, Box2 };
