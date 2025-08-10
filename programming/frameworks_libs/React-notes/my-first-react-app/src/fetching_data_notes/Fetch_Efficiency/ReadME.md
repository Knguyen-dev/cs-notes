# Efficently handling fetch requests and considering performance in React.

- There are many ways to fetch data in react. Using data management libraries,
  such as GraphQL, using useEffect which many think is controversial due to it
  causing waterfalls, and other things.

- Types of data fetching:

1. initial data fetching: Data that a user sees when a page loads or when you
   open it. The data that appears when a component appears or mounts, which is
   usually done with an useEffect (or componentDidMount).
2. on-demand data fetching: Data that we fetch after a user interacts with a page,
   in order to update the page. Things such as autocompletion, dynamic forms, or
   maybe a search bar that continuously updates results as we search. In all of
   these, the user causes an event for new data to be fetched.

NOTE: The core idea and patterns of how to fetch these two is the same, but
here we focus more on initial data fetching because an app's performance
with that will decide whether the user thinks an app is fast or really slow.

# Usage of Data libraries:

- If you're fetching data once, and then not really using it again, then a
  simple fetch and useEffect is fine. However, if it's more complicated
  such as multiple components want to fetch data from the same endpoint, cache
  that data, error handling, etc. We should consider an existing data library.
  Libaries such as axios, swr, etc. just give us the tools, but speeding up an
  app needs you to understand the fundamentals of fetching data efficiently.

# Performance:

- Measure it by how fast your component takes to render. The faster, the better performance it is. When fetching, think of what is the most important information you
  want to show to the user. Whether you want your main data rendering after other less
  important components on your page, or if you want the users to see the page after everything is done.

- Keep in mind the stages of data fetching:

1. What should we start fetching
2. What do we do while it's fetching
3. What do we do when we're done fetching.

# Browser limitations and data fetching:

- Browsers can only handle a limited number requests
  in parallel. In chrome it's 6, so if you make more requests, they
  are put into a queue. This isn't unreasonable for a big App to have multiple
  initial fetch requests like this, but if even having 6 slows the app down a lot.

- Credits: https://www.developerway.com/posts/how-to-fetch-data-in-react
