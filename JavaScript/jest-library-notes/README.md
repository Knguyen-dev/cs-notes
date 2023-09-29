# Jest Library Notes
- Doing unit testing with Jest Framework

- How to set up:
1. Initialize package.json
2. "npm install --save-dev jest" to install jest
3. In package.json do "test: jest" in scripts to create a command to test files. Now you can do "npm run test" to run .test.js files
4. Doing "test: jest --coverage" will show you what files, functions, and lines are being tested. It'll give you a report on the files 
	being tested, and also gives us a percentage of the lines of code being tested. So if there's some code in the function that isn't being 
	tested

- How to create test files:
1. Take the name of the file, add .test.js to the end

- What are matchers: Basically test methods that help us with unit testing. There's a lot of them
	and you can find them all on the documentation.





- Setting up Babel for using ES6 modules:
	- By default Jest currently doesn't recognize ES6 import statements.
	So in order to use ES6 modules, you must install Babel.
	1. npm install --save-dev babel-jest @babel/core @babel/preset-env
	2. Create file "babel.config.js" in the root of the project to configure babel
	3. Paste in the required presets that's on babel's documentation


- Credits:
    1. Web Dev Simplified: https://www.youtube.com/watch?v=FgnxcUQ5vho
	2. Jest matchers docs: https://jestjs.io/docs/expect
