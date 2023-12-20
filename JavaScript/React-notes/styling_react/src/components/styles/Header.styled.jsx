/*
+ Usually your react components will contain
 or use these styled components. Here
 we want to create a header component or element 
 that already has some styles. Then we want to 
 use it in our Header.jsx react component

+ Nesting styles: You can also nest styles.
  For example, we make it so any h1 tag wrapped around
  this StyleHeader component is going to get 
  those h1 styles we defined


+ Using ampersand: Refers to when you're creating
  a rule for the current style. In this example, 
  we're saying on hover of the 'header' element, 
  we'll make it's background-color blue.

  export const StyleHeader = styled.header`
    &:hover {
      background-color: blue;
    }
  `
+ Passing props to styled components:
1. In your react component you can pass a prop to the styled
    component.
2. Then access that prop like its a react component
*/
import styled from "styled-components";

export const StyleHeader = styled.header`
  background-color: ${(theme) => theme.bg_color.header};
  padding: 40px 0;

  h1 {
    color: red;
  }
`;
