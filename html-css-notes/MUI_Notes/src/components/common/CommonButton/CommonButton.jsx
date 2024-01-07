/* eslint-disable react/prop-types */
/*
+ Buttons:
1. It's a good idea to make it so we can reuse this button a lot.


- Various props:
1. children: Children elements
2. variants: Type/style of button
3. color: The background color of button


- Use the button api docs to see all props 
  we can use to customize the MUI button component: https://mui.com/material-ui/api/button/


NOTE: In previous versions, you'd use 'classes' to override styles
  of a MUI component, but now in the latest version you use the 'sx' prop 
  as it has better performance.



+ Common Button: 
1. children: We want it to have children such as text
2. color: We want to customize the button
3. disabled: Maybe we want to disable or enable the button?
4. size: We want to control how big or small it is
5. sx and variant: we want to mess with styles
- Now we have a common button. Of course we could use 'Button' from MUI
  but the point of this is that we can have a uniformly styled button
  component throughout our app

*/

import { Button } from "@mui/material";
export default function CommonButton({
	children,
	color,
	disabled,
	size,
	sx,
	variant,
	onClick,
}) {
	return (
		<Button
			color={color}
			disabled={disabled}
			size={size}
			sx={sx}
			variant={variant}
			onClick={onClick}>
			{children}
		</Button>
	);
}
