/*
+ MUI Grid: Uses flexbox, a grid is a flex item. It has 5 breakpoints xs, sm, md, lg, and xl. 
  A grid row has 12 available columns like bootstrap. So here on xs to larger screens it takes 8 columns.

  So right now, our AppLayout is the grid, which lets us define these grid items.

*/

import Grid from "@mui/material/Grid";

export default function Authentication() {
	return (
		<Grid item xs={8}>
			This is authentication page.
		</Grid>
	);
}
