/*
+ Here is how we make global styles, then you export it and wrap it around your
 app markup. The idea of global styles is that we don't have something like an index.css
 for our global styles.


*/

import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  @import ur("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap")
  * {
   box-sizing: border-box;
  }
  body {
   background: ${({ theme }) => theme.bg_colors.body};
   color: hsl(192,100%,9%),
  }
  p {
   opacity: 0.6;
  }

  img {
   max-width: 100%
  }
`;
export default GlobalStyles;
