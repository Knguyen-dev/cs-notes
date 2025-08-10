/*
+ How about codesplitting react components:
- Typically, a lot of your codesplitting should be in the 
file where you handle your routes. This is because this is where 
you import a lot of pages and other components and  if 
you're on the home page you shouldn't immediately download any other pages or 
components that aren't being rendered on that page. React makes 
codesplitting components easier with React's lazy() function.

- Ex. 2: Codesplitting components
1. import lazy. Now pass in a callback into lazy
    where we need to return a promise. Just call our import function.

2. As a result, our Home componetn is lazily loaded. So if 
  a user came to the site directly from the 'Store' or 'About'
  page, since we aren't rendering the 'Home' component on those 
  routes, then it isn't being downloaded which is great. However
  there is one issue.
- ISSUE: Let's say we land on the Store page and click the 
  'Home' link to go to the home route. This causes the application
  to actually download the files related to the 'Home' component, but why 
  isn't the 'Home' page rendering. This is because when lazy-loading
  react-components, React needs to know you're doing that and so you
  need to use 'Suspense' component in react.
- Solution: You need to wrap the 'Suspense' component around the 
  components that are going to be lazy loaded. So in this 
  case we know that the 'Outlet' inside NavWrapper is where 
  all of our pages are being rendered, and one of those pages is 
  being lazy loaded. So just wrap Suspense component around Outlet

+ Lazy loading pitfall: 
- When clicking on 'About' link we get an error. The reason is because 
  our Home and Store are default exports whilst 'About' is a named export.
  The 'lazy' expects to get an object with a default property, and a component 
  in that property such as: {default: some_component}. This works just fine with 
  our two other files since those have a default export, but our file that has no
  default export needs to be tweaked a little.
1. Use promise chaining on import() function. In the then callback return 
  an object with the default property and assign its value to the named export.
  As a result, with this we are returning an object with property 'default' that 
  has our component as the value for the lazy function!
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import NavWrapper from "./components/NavWrapper";

// Importing 'Home' component normally
// import Home from "./pages/Home";
// import Store from "./pages/Store";
// import {About} from "./pages/About";

const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));

// Bad, since we don't return an object {default: some_component} for lazy function
// const About = lazy(() => import("./pages/About"));

// Good, we essentially returned an object with property lazy that has our component
const About = lazy(() =>
  import("./pages/About").then((module) => {
    return { default: module.About };
  })
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavWrapper />}>
          <Route index element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
