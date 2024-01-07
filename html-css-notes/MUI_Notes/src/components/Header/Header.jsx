/* eslint-disable react/prop-types */
import CommonButton from "../common/CommonButton/CommonButton";
import NotificationBell from "../common/NotificationBell/NotificationBell";
import { Typography, IconButton, Avatar, Box } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CommonToolTip from "../common/CommonToolTip/CommonToolTip";

export default function Header({ title }) {
	const headerStyles = {
		wrapper: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#009be5",
			padding: "20px",
		},
		topRow: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "end",
			alignItems: "center",
			marginBottom: "20px",
			"*": {
				marginRight: "5px",
			},
		},
		middleRow: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: "20px",
			marginLeft: "320px",
		},
		link: {
			fontWeight: 500,
			color: "rgba(255, 255, 255, 0.7)",
			"&:hover": {
				color: "#fff",
				cursor: "pointer",
			},
		},
		webButton: {
			marginRight: "5px",
		},
	};

	return (
		<Box sx={headerStyles.wrapper}>
			{/* Top row */}
			<Box sx={headerStyles.topRow}>
				<CommonButton sx={headerStyles.link}>Go to docs </CommonButton>
				<NotificationBell iconColor="primary" />
				<Avatar src="https://mui.com/static/images/avatar/1.jpg" />
			</Box>

			{/* Second row*/}
			<Box sx={headerStyles.middleRow}>
				<Typography variant="h1" color="white" sx={headerStyles.link}>
					{title}
				</Typography>

				<Box>
					<CommonButton variant="outlined" sx={headerStyles.webButton}>
						Web setup
					</CommonButton>
					<CommonToolTip title="Help">
						<IconButton color="white" sx={headerStyles.helpIcon}>
							<HelpIcon />
						</IconButton>
					</CommonToolTip>
				</Box>
			</Box>
		</Box>
	);
}
