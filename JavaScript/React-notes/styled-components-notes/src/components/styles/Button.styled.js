/*
- Here we have the option to pass in props. We set it up
  so that if no props were passed it, we default to certain 
  colors for our background and button text color!


*/

import styled from "styled-components";
const Button = styled.button`
	border-radius: 50px;
	border: none;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	cursor: pointer;
	font-size: 16px;
	font-weight: 700;
	padding: 15px 60px;
	background-color: ${({ bg }) => bg || "#fff"};
	color: ${({ color }) => color || "#333"};

	&:hover {
		opacity: 0.9;
		transform: scale(0.98);
	}
`;

export { Button };
