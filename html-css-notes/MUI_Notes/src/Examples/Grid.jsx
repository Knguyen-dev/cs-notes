/* eslint-disable react/jsx-no-undef */
/*
+ Material UI Grid System: A 12 column grid system that uses flexbox. Each
  item's width is a percentage, and its always fluid (100%) relative to 
  the grid container.


+ Two types of layout:
1. containers
2. layouts

+ 5 grid breakpoints: xs, sm, md, lg, and xl

*/

import { Grid } from "@mui/material";

/*
1. Add container so that the grid acts like a container, making it 
  a flex-container rather than a flex-item by default.
  Then for your grid items we wrap them in a Grid and then an Item
  component

2. Works exactly like bootstrap, as on xs screens and higher 
  they take those columns.

3. Then you can use things such as spacing, rowSpacing, and 
  columnSpacing as gap, row-gap and column-gap.

NOTE: Recommend using Grid 2.0, since it fixes some bugs and 
  removes unnecessary item prop. In all cases grid works 
  the same way, and if you've used flexbox, then this is 
  already predictable. Also note that "Item" is just a placeholder 
  components that you'd replace with your actual items.


+ Docs: 
1. Grid: https://mui.com/material-ui/react-grid/
2. Grid 2.0: https://mui.com/material-ui/react-grid2/
*/
export default function Example1() {
	return (
		<Grid container spacing={{ xs: 2, md: 4 }}>
			{/* First row */}
			<Grid item xs={8}>
				<Item>xs=8</Item>
			</Grid>
			<Grid item xs={4}>
				<Item>xs=4</Item>
			</Grid>

			{/* Second row  */}
			<Grid item xs={4}>
				<Item>xs=8</Item>
			</Grid>
			<Grid item xs={8}>
				<Item>xs=8</Item>
			</Grid>
		</Grid>
	);
}
