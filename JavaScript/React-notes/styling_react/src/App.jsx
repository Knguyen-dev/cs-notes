/*
+ Here's an example of how we can do themes with styled components

1. import ThemeProvider from styled-components
    Wrap it around your App's markup and give it 
    a theme prop
2. Create a theme object with your styles
3. Here we defined 'bg_colors' for the different 
    colors for our header, body and footer. 
4. Now we don't even need to pass in props to 
    your styled components. Just go to the styled file
    and access the 'theme' prop given by the context
    provider, and get your background color value

*/

import { ThemeProvider } from "styled-components";
import { Container } from "./components/styles/Container.styled";
import Header from "./components/Header";

const theme = {
  bg_colors: {
    header: "#ebfbff",
    body: "#fff",
    footer: "#003333",
  },
};

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Container>
          <h2>Stuff</h2>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
