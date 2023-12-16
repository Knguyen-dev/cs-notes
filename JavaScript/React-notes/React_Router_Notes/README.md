# React Router

- React Router is a library that helps manage page routing and navigation in your React Applications.
  In a single page application (SPA), everything is rendered on a single HTML page.
  With React Router, you can create multiple 'pages', or components that can be rendered based
  on a URL, without actually needing to load new HTML Pages. React router intercepts the requests
  for a new page, so that in the end we are still able to switch page content but still rely on a
  single html page.

# Starting Setup:

1. npm install vitest --save-dev; installs Vite's testing library
2. Add "test":"vitest" as script.
3. npm install jsdom --save-dev; install to enable html in vitest
4. In vite config file do test:{environment: "jsdom"}
5. npm install @testing-library/react @test-library/jest-dom --save-dev; install react testing library
6. npm install @testing-library/user-event --save-dev
7. Set up a test folder with a setup.js file for testing
8. npm install web-vitals --save-dev; allows you to see perforamnce and metrics for your web app

# Set up React Router:

1. npm install react-router-dom

# Good organizational practices:

1. Place your layouts and pages in separate folders
2. When you create a new layout, we create a new folder that holds
   the components that the layout renders or needs.

- Credits:

1. Web Dev Simplified: https://www.youtube.com/watch?v=Ul3y1LXxzdU
