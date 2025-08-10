/*
+ One last Tip:
- It's probably best to create your own custom
  lazy loading function to make it easier when working 
  with both named and default exports.

- Conditional
1. If it isn't named export, then just return the promise. As a result
    React's lazy function will get an object {default: some_component}
    which will work
2. Else, if it's a named export, then we need to tweak it 
    so that we return an object in fomr {default: the_named_export}
    for the lazy function to work.

- NOTE: The only thing to watch out for, is that the paths should 
    be relative to the location of the lazyLoad.ts file itself.
    So since this is in the src directory, it doesn't make much difference. 
    But if this was located in the 'utilities' directory, I'd have to do '../pages/Home'.
    I'd be in the 'App.tsx', but I'd create the path as if I'm searching from 
    lazyLoad.ts inside the utilities folder.

*/
import { lazy } from "react";

export default function lazyLoad(path: string, namedExport: string | null) {
  return lazy(() => {
    const promise = import(path);

    // If it isn't a named export, import() retur
    if (namedExport == null) {
      return promise;
    } else {
      return promise.then((module) => ({ default: module[namedExport] }));
    }
  });
}

// Using lazyLoad to import the Hoem compoennt, which is a default export
const Home = lazyLoad("./pages/Home");

// Using lazyLoad to import a named export, so we pass in the name as the second argument
const About = lazyLoad("./pages/About", "About");
