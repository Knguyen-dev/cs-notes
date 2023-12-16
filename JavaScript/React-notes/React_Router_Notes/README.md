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

# Terms

- Route: A path
- Parent Route: A Path has other paths nested inside of it. These
  paths contain components we refer to as "Layouts", which lay foundational markup that will be shown on nested routes, and will likely be important for the nested routes.

# Error Page:

- Default error page: React-Router-Dom provides a default error page when users try to go to a non-existent route.
- Custom Error Page:
  1. CatchAllRoute: Placed at the bottom of your tree, with its parent being the route for the root layout of your application. Typically used for an error page.

# Loaders:

- A way we can load data into a component before it's loaded by a route. For example, if you have a page that uses fetched data in the component, when the user goes on that route, we call the loader function to fetch that data for that component, allowing us so that on render, the component already has the fetched data for its markup.

NOTE: React-router will wait until loader finishes executing before
rendering the page.

# Route Parameters:

- These are changeable sections of a route, allowing for the same
  component to be shown with different variations. For example,
  "/products/id", where id is a common changeable route parameter.
  We want to still show the same general component, but specialize it
  with the specific product's information.

# Using JSON Server as a mock endpoint:

- Allows us to wrap a json file with api endpoints so we
  can interact with it like it's a REST API. Allowing us to
  do create, read, update, and delete data. For this project though
  we're just going to read data from our json file.

1. npm install -g json-server; installs json-server globally, which is necessary to work it seems.
2. json-server -p 4000 -w ./data/db.json; Creates endpoint at port 4000 for the json file "db". React uses port 3000, so we can't use port 3000, so we chose 4000.
3. Now if we go to local host port 4000, we'll see that json data.

NOTE: To test the application you can either run two terminals
one for json-server and the other for vite, or you can just use
the concurrently package and do npm "run dev-all".

# Concurrently

- Allows us to run multiple scripts defined in package.json at the same time, without having
  to create multiple terminals. Here it's useful as we can start the json-server and vite server in one npm command.

1. npm install concurrently --save-dev
2. Set up the scripts. Then run them.

NOTE: As this project is just notes and not real (literally using a json file as a db), we can keep this
as a dev dependency because if it was real we'd use a real endpoint. There wouldn't be a need for
concurrently or the json-server in production.

- Credits:

1. Web Dev Simplified: https://www.youtube.com/watch?v=Ul3y1LXxzdU
