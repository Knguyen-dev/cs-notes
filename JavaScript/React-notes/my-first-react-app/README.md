# React + Vite


#   PropTypes:
1. 'npm install --save-dev prop-types"; to install prop-types
-   Credit: https://www.youtube.com/watch?v=cx0S8JyiVxc

# How to set up Vitest with React Testing Library
1. npm install vitest --save-dev; to install Vite's testing library.
2. In package.json add "test":"vitest" as a script
3. Create test file in form "someFile.test.jsx" and do "npm run test"; At this 
    point we've successfully added Vitest to our project which acts as a replacement for 
    Jest. However, React deals with React components so let's keep going.
4. npm install jsdom --save-dev; install this to enable HTML in Vitest
5. Include test: {environment: 'jsdom} in vite config file 
6. npm install @testing-library/react @testing-library/jest-dom --save-dev; Install React Testing Library
7. Create a test setup file such as "test/setup.js" and configure the file to run a cleanup function
    after every test case.
8. Include the setup file in vite config file. Make all imports from Vitest global, so you don't need to import something such as 'expect' in each file manually.
9. npm install @testing-library/user-event --save-dev;

# Running tests
1. npm run test; runs all tests
2. npm run test someTest.test.jsx; runs an individual test file

- @test-library/react: Gives us access to functions such as render()
- @testing-library/jest-dom: Gives us matchers for messing with DOM such as 'toBeInTheDocument'
- @testing-library/user-event: Gives userEvent API which simulates user interaction with webpage.