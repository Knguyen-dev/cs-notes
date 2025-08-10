# Material UI Notes

- A UI component library for React. Styled following 'Material Design' specification, which is just
  list of best practices for web development made by Google. So this is just Bootstrap but by
  Google. When using material UI, we're basically just using components, and customizing the styles
  of those components through react props.


NOTE: In this we have our actual app, which is a react router app.
  This is for showing practical examples and whatnot. Here it's what you
  may see in a real project. Note that when we go to Material UI, we start
  by copy and pasting the component, and then we slowly get rid of the extra stuff 
  and make that component reusable for our use case. Rarely do you actually see 
  us copy and paste a component, and then use just the component out of the box.
  We always put that component in our 'common' folder because we want to make it flexible. This is definitely going to be true for more complex components such 
  as snackbars, loading skeletons, steppers, etc.

# Materials Icons:

- With the docs you have access to a library of material icons as well.
  Just literally search for material icons. With this you don't have to
  go to another library to find your icons. You can simply import icons
  from MUI.

# Core Installation

1. npm install @mui/material @emotion/react @emotion/styled; install material UI
3. npm install @mui/icons-material; install for us to use icons
2. Install roboto font and material icons. You can do this via the cdns.



# MUI X Data Grid Installation:
1. npm install @mui/x-data-grid


# Set up tailwind with mui
1. https://tailwindcss.com/docs/guides/vite; vite installation
2. Remove preflight styles via tailwind.config.js. This disables it
  for entire project. As well as this "@tailwind base" is responsible 
  for injecting preflight, so once you configured the tailwind.config.js
  you can remove this line
3. Add important option for the app's wrapper. So put the id of your 
  app's wrapper. For vite, you can create in main.jsx, that the id is 
  "root". This basically allows for tailwind styles to take priority
  over MUI styles.
4. Change injection order of CSS. Done in GlobalCssPriority
5. Then for portal related elements (elements outside dom flow) you 
  have to change the target app wrapper so that they're injected under
  main app wrapper used in 'Tailwind.config.js' in the 'important' option!
6. Now you should be able to use className prop on your Mui components and it 
  should apply tailwindcss classes


# Extra packages: 
1. React Hook Form: Enables easy form validation and management using React hooks.
  So here you can manage form state and validation without complex state management
  or additional libraries.
2. Yup: JavaScript schema validation library used for form validation. Define a 
  schema for your data and validate stuff. Simple and powerful API for validation
  rules in your form fields
NOTE: Though we are mostly focusing on getting the hang of Mui libraries


# Credits:
1. Net Ninja (Mui 4): https://www.youtube.com/watch?v=0KEpWHtG10M&list=PL4cUxeGkcC9gjxLvV4VEkZ6H6H4yWuS58
2. ATypical Developer (Mui 5): https://www.youtube.com/watch?v=h9KevTtI5O0&list=PLDxCaNaYIuUlG5ZqoQzFE27CUOoQvOqnQ&index=1 
3. Mui Docs: https://mui.com/material-ui/getting-started/

