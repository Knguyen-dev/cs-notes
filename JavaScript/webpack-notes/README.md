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
   index.js or app.js in src, these could be empty.

NOTE: Now we've set up webpack and regular project stuff

-   Section 2 - Loaders:

1. "npm install --save-dev sass style-loader css-loader sass-loader" installs loaders so that sass and css work. If you don't use sass just get style and css loader. Now import your css file to index.js
2. Set up loaders in webpack config with module object and rules array.

NOTE: Now css can be imported and it works

-   Section 3: Plugins:

1. "npm install --save-dev html-webpack-plugin" Download html plugin and update webpack.config file to have 'HtmlWebpackPlugin'. Then create the plugins array and add this to it.

NOTE: Now we should be able to delete our dist folder, and when
we run build, it creates not only the output js file, but
the output html file we defined in webpack.config.js.

2. Set up the templates.html file, that the output index.html file
   builds off of. So your 'dist/index.html' will be a copy of 'src/template.html', but it's linked to the bundle.js.

-   Section 4: Caching

1. In output do "filename: '[name][contenthash].js'. Now the bundles should have a hash behind them, the index.html is still correctly linked to it.

-   Section 5: Auto reloading webpack dev server:

1. In "scripts" do "dev: 'webpack serve'". Then do "npm run dev", and install webpack dev server
2. In webpack config create 'devServer' with standard values

NOTE: Now doing "npm run dev" should open a dev server, so you don't need live server anymore

-   Credits:
    1. Traversy Media: https://www.youtube.com/watch?v=IZGNcSuwBZs
