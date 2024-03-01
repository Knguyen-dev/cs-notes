import styled from "styled-components";

/*
- Custom flexbox fiv. Any direct divs or ul tags
  will be given flex 1.

*/

export const Flex = styled.div`
	display: flex;
	align-items: center;
	& > div,
	& > ul {
		flex: 1;
	}

	@media (max-width: ${({ theme }) => theme.screens.mobile}) {
		flex-direction: column;
		text-align: center;
	}
`;
