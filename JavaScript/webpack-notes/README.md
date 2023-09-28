# Webpack 5 Tutorial

-   Just a quick crash course to using webpack

# Section 1 - How to set up:
1. Create dist and src folders
2. "npm init -y" to initialize package.json
3. "npm install --save-dev webpack webpack-cli" installs webpack
4. Do a ("build": "webpack --mode production") script in package.json to run webpack. This compiles
   and updates your code everytime, so run this when you're making changes.
5. Create "webpack.config.js" file. This is where you'll set up the input and output for the bundle.js file, and the name of that bundle whether it be 'bundle.js', 'main.js', etc.
6. At this point you'll probably only have index.html in dist and
   index.js in src, these could be empty. 


- entry: Where you specify what your code is going to be called.
- output: Where your code is going to be outputted and how
- filename: How the name of the file is going to be. How we set it up 
   here is that the key in the entry, which is "bundle", is going to be the filename.


NOTE: Now we've set up webpack and regular project stuff

# Section 2 - Loaders:
1. "npm install --save-dev sass style-loader css-loader sass-loader" installs loaders so that sass and css work. If you don't use sass just get style and css loader. Now import your css file to index.js
2. Set up loaders in webpack config with module object and rules array.

NOTE: Now css can be imported and it works

# Section 3: Plugins:
1. "npm install --save-dev html-webpack-plugin" Download html plugin and update webpack.config file to have 'HtmlWebpackPlugin'. Then create the plugins array and add this to it.
2. Set up the templates.html file, that the output index.html file
   builds off of. So your 'dist/index.html' will be a copy of 'src/template.html', but it's linked to the bundle.js.
- NOTE: Now we should be able to delete our dist folder, and when
we run build, it creates not only the output js file, but
the output html file we defined in webpack.config.js.

# Section 4: Caching
1. In output do "filename: '[name][contenthash].js'. Now the bundles should have a hash behind them, the index.html is still correctly linked to it.

- Definition: Idea of storing frequently used resources locally, so that they can be accessed more quickly. Browsers cache files like CSS, js, and images to avoid unnecessary downloads everytime a user visits a webpage. In turn, this improves the performance and load times of websites.
- Browser cache: Browsers storing files locally in a cache. So when a user revisits a page, the browser can use the cached version of a file, let's say an image, if the file hasn't changed
Server cache: Servers can tell browsers to cache certain files using HTTP headers like 'Cache-Control'
Content Delivery Networks (CDNs): Distribute content across multiple servers around the world to deliver it faster to users.
- Contenthash: A unique hash based on the contents of a file. Used to generate unique file names for assets such as JavaScript and CSS files when they're made during the build process. Useful for browser caching as when the contents of a file changes, its hash changes, and the browser will see it as a new file, preventing users from using the old outdated cached versions


# Section 5: Auto reloading webpack dev server:
1. In "scripts" do "dev: 'webpack serve'". Then do "npm run dev", and install webpack dev server
2. In webpack config create 'devServer' with standard values


- NOTE: This parts where your output file 'index.html' is to run, makes it more specific as maybe you have multiple index html files, or you want to specify where the project is. 
1. port: 3000; indicates the port on the local host that the project runs on
2. open: true; now when you run 'npm run dev' it opens the browser automatically
3. hot: true; Implements a feature called 'Hot Module Replacement', which means that you can update parts of the application without requiring a full-page reload. It just enhances the development experience by making code updates faster. 
4. compress: true; Controls whether content served by webpack dev server should be compressed (g-zip compression) before being sent to the browser. This can significantly reduce amount of data transferred over the network. Gives you faster load times, reduced bandwidth, and improved performance because it's compressing the size of the files.
5. historyApiFallback: Used to handle URL routing in single-page applications that use HTML5 History API for navigation. Ensures that requests for routes in the application are handled correctly even when the user enters a url directory or refreshes the browser. Not really needed in this application

NOTE: Now doing "npm run dev" should open a dev server, so you don't need live server anymore

# Section 6: Cleaning dist folder
1. In webpack.config file in output, put "clean: true" so that dist folder doesn't clog up with multiple bundle.js files

# Section 7: Source maps
- Definition: Good for debugging because a lot of teh time it doesn't actually show you what line number when something messed up. Using a source-map is good since it shows what line where you code when wrong in your source files, which is better than having to look at an error at some line number in your bundle.js file.
1. add devtool: 'source-map' into your webpack.config file

# Section 8: Adding babel loader for backwards compatibility
1. "npm install --save-dev babel-loader @babel/core @babel/preset-env" to install babel.
2. Then in webpack config set up a rule for babel-loader

- Section 9: Using assets resource loader for using images 
1. Create 'assets' folder in src and put your images there
2. Webpack already comes with this, so create a new rule in your webpack config file. Then do "assetModuleFilename: '[name][ext]'"
so that images in your src folder keep their original names when copied into dist. 

3. Now when you import images into your index.js, or code connected 
to it, the dist will copy over that image
NOTE: Now you should be able to use images


- Extra: Eslint and prettier setup
1. Install prettier and eslint as save dev
2. Set up your prettierignore and prettierrc files
2. Initialize eslint, giving your the eslintrc.js file. Also make a ".eslintignore" file
3. Do "npm install --save-dev eslint-config-prettier" to make eslint and prettier work more easily.
NOTE: You'd also put "prettier" in the extends array to make it work typically. For some reason here it doesn't work, but 
   in future projects just do that. Also realistically, try to do the prettier and eslint stuff before trying to do everything else



-   Credits:
    1. Traversy Media: https://www.youtube.com/watch?v=IZGNcSuwBZs
