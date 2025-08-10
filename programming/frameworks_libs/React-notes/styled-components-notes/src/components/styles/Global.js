/*
+ Global Styles: Global styles are just the foundational
  styles you want. Typically global styles are defined in 
  the index.css. Styles for links, lists, the body, etc.
  Styled-components allows us to create global styles as well.

1. Create our global styles.
2. Then import them into App.jsx

- NOTE: Don't use @import for importing fonts with GlobalStyles. 
  It's suggested by styled-components that you should just include the 
  links in the index.html file.


+ Accessing theme in global styles: Since we set it up that 
  our ThemeProvider wraps around our GlobalStyles component, then
  we're also able to use the theme values in our Global styles.
*/

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: hsl(192, 100%, 9%);
    font-family: 'Poppins', sans-serif;
    font-size: 1.15em;
    margin: 0;
  }

  p {
    opacity: 0.6;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }



`;

export default GlobalStyles;
