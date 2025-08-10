/*
+ Themes: We use the ThemeProvider given by 
  styled-components, and then we pass in our own 
  theme object. There's no strict structure on this,
  but here's a good way. 
  
1. In our .colors property we define different background 
  colors for the header, body, and footer of the app.
  We'll then be able to access these anywhere in our lower styled
  components.
2. In our 'screens' property we define breakpoints for the 
  different screen sizes.
*/
const theme = {
	colors: {
		header: "#ebfbff",
		body: "#fff",
		footer: "#003333",
	},

	screens: {
		mobile: "768px",
	},
};

export default theme;
