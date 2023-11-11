# React Notes

# What is React?

-   A: A javascript library for web development and making front end inerfaces. A library with a collection of pre-written code
    to make development easier. Rather than making components and modules of code from scratch, you can just use ones that
    have already been created.

*   Complexity of setting up react: It's actually really hard to set up without using a toolchain like "Vite". So
    we use toolchains such as "Vite's React Config" to set up react more easily and this is the common approach.
    NOTE: The toolchain 'Create React App' isn't recommended anymore.

1. Package management (Npm)
2. Module bundling (webpack)
3. Compilation (Babel)
4. React itself

# How to set up react

1. 'npm create vite@latest my-first-react-app -- --template react'; initialize a react app with name 'my-first-react-app'.
   It'll create a new director yfor your react project. If successful, it should give you some console instructions to run. Finally head over to "localhost:5173" to see the react page
2. Now your react project should have a bunch of files
3. Vite sets up eslint for you, but you'll need to get prettier and eslint-config-prettier on your own

# Files Explained

1. You'll see standard files "package.json", "package-lock.json", ".gitignore", "README.md".
2. "public": Folder where all of the static assets of your app will go such as images, icons, and information files for browser.
3. "src": Where you put all of the code that runs your app
4. "main.jsx": Entry point of the application.

# Developer Tools and how to use it

1. Download "React Developer Tools" chrome extension, which helps with debugging and tracking the moving parts inside your application.
   This extension adds on to the chrome dev tool, adding a tab for components

2. Components Tab: Can help you find what component is rendering what element of the page. On the left panel it shows you the "React component tree", and
   by hovering over a component, it'll show you what its rendering on the page. On the right panel it shows you where that code ran from.

-   Should learn:
    1. Context API
    2. Custom Hooks
    3. React Router
    4. memoization
       etc.
