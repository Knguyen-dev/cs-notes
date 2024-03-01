import { ThemeProvider } from "styled-components";

import Container from "./components/styles/Container.styled";
import Header from "./components/Header";
import Footer from "./components/Footer";
import theme from "./appTheme";
import GlobalStyles from "./components/styles/Global";
import content from "./content";
import Card from "./components/Card";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Header />
			<Container>
				{content.map((item) => (
					<Card key={item.id} item={item} />
				))}
			</Container>

			<Footer />
		</ThemeProvider>
	);
}
