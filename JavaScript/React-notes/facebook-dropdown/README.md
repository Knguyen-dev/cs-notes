-   Credit: https://www.youtube.com/watch?v=IF6k0uZuypA

*   Just a dropdown and some notes about basic react concepts such
    as component composition, but also the way to do animations/transitions
    in React.

# How to use svgs in React

1. Import the svgs you want to use to the file as
   "React Components". First convert them into react components
2. Do 'npm install vite-plugin-svgr'
3. Add vite plugin to vite.config.js
4. Now you can import your svgs files as "react components".
   Do 'import MySvgIcon from "./iconPath?react" to import
   it. It used to be 'ReactComponent' but now it's this.
5. Now we can use svgs as react components, but really they're
   still svg tags on the inside, it's just that this way we didn't
   have to do as much work.
