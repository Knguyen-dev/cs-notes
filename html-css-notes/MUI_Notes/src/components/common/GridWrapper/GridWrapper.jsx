/* eslint-disable react/prop-types */

/*
1. Our grid set up is a little strange, so we have a grid wrapper 
  that makes it easier to wrap the content of our various pages.


*/
import Grid from "@mui/material/Grid";
import { gridWrapperStyles } from "./styles";

const GridWrapper = ({ children }) => {
	return (
		<Grid item xs={12} sx={gridWrapperStyles}>
			{children}
		</Grid>
	);
};

export default GridWrapper;
