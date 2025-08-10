/* eslint-disable react/prop-types */

/*
+ Similar to how box is just a container with padding, we're 
  going to use BasicCard like a container.

*/

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function BasicCard({ header, content }) {
	return (
		<Card>
			{header}
			<CardContent>{content}</CardContent>
		</Card>
	);
}
