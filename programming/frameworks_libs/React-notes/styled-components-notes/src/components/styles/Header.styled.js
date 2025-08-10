/*
+ Convention: Usually the convention is that you can 
  '.styled' or '.style' to differentiate the styled component 
  from a regular react component. Then you'd use your 
  styled-components in your react components. Notice how we have 
  a personalized styled-component for our react Header component.


+ Css and targeting: Essentially you write css how you'd
  normally write it in like a regular .css file. One special 
  thing is the '&', which just refers to the current element.
  Here if we hover over the current element, the StyleHeader, 
  then we apply our hover styles. It's kind of like the 
  'this' or 'self' keyword in javascript and python, where it just 
  refers to itself.


// Target an h1 tag within the styled component
	h1 {
		color: red;
	}

	&:hover {
		background-color: black;
	}

+ Passing props into a styled-component: You can pass
  in props to a styled component. Then you can access 
  those props within the styled-component. In our first 
  example we would have done <StyleHeader bg="red">...</StyleHeader>
  to pass in a prop for the background color. Then we access it 
  with this arrow function, allowing us to style things based on the props 
  we're passed.

1. background-color: ${(props) => props.bg}; 

+ Techniques and Methods: Since the Nav and Logo components
  are going to be only used in the Header component. We're 
  going to create the styled-components in the Header.styled.js file to group
  those related styled-components together. On the other hand, we plan to 
  use our customized button in various different places, so
  Button will be a styled-component in styles folder.


- NOTE: Remember that static assets are served from the public
  directory. So you can pretend like you're in the public directory 
  and directly traverse to './images/some_img.svg'  like so.
  Everyone does things differently, with Brad, his main goal with styled-components
  is to avoid creating css classes.


*/

import styled from "styled-components";

// Styled header tag
const StyleHeader = styled.header`
	// background-color: #ebfbff;

	background-color: ${({ theme }) => theme.colors.header};

	padding: 40px 0;
`;

// styled nav tag
const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;

	@media (max-width: ${({ theme }) => theme.screens.mobile}) {
		flex-direction: column;
	}
`;

// A styled img tag.
const Logo = styled.img`
	@media (max-width: ${({ theme }) => theme.screens.mobile}) {
		margin-bottom: 40px;
	}
`;

const Image = styled.img`
	width: 375px;
	margin-left: 40px;
	@media (max-width: ${({ theme }) => theme.screens.mobile}) {
		margin: 40px 0 30px;
	}
`;

export { StyleHeader, Nav, Logo, Image };
