# Webpack 5 Tutorial

-   Just a quick crash course to using webpack

-   Section 1 - How to set up:

1. Create dist and src folders
2. "npm init -y" to initialize package.json
3. "npm install --save-dev webpack webpack-cli" installs webpack
4. Do a ("build": "webpack --mode production") script in package.json to run webpack. This compiles
   and updates your code everytime, so run this when you're making changes.
5. Create "webpack.config.js" file. This is where you'll set up the input and output for the bundle.js file, and the name of that bundle whether it be 'bundle.js', 'main.js', etc.

6. At this point you'll probably only have index.html in dist and
   index.js or app.js in src.

-   Credits:
    1. Traversy Media: https://www.youtube.com/watch?v=IZGNcSuwBZs
