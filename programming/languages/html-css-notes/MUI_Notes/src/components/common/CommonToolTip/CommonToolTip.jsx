/* eslint-disable react/prop-types */
import { Tooltip } from "@mui/material";

export default function CommonToolTip({ title, placement, children }) {
	return (
		<Tooltip
			title={title}
			placement={placement}
			slotProps={{
				popper: {
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -14],
							},
						},
					],
				},
			}}>
			{children}
		</Tooltip>
	);
}
