/*
- Situation: If the user is on the home page, there's 
no need to download data about the 'About' or 'Store' page because
the user isn't seeing or being affected by those pages.
Our adminData should only be imported/downloadedds when isAdmin is true and we're 
actually going to need to render it. As well as this, the sum() function we call, we should only
download and import that code once we actually click the button. It's similar 
to how games only bother rendering the scenes that you're looking at.

+ How to inspect what's being downloaded:
1. Refresh, go to chrome dev tools and into sources tab.
2. Now chrome will show all of the files being downloaded.
Without code splitting, you should basically be seeing all of the 
folders because all of those components and pages are being loaded
in the background, even if you, the user, aren't directly on the page or viewing them.

+ How to code split:
- Dynamic import: We'll use dynamic import which means
we'll only import something when it's being rendered or being used.

- Ex. 1: Let's code split our 'sum' function.
1. In the onClick callback call a function import(path_to_function) and pass in the 
path of the function you want to codesplit/dynamically import.
2. This is a promise (asynchronous task), that resolves into the 'module' which is just
an object with all of that file's exports.
3. Then call the function you want. Here sum is a default export so doing module.default(2,2)
calls the sum function with those arguments. Of course if I exported something else (non-default)
such as 'foo()', then I'd call that export by doing module.foo().
- Takeaway: As a result, our sum.ts file and its code is only downloaded once 
I click the button, rather than just always being imported. So when you check the 
sources on the chrome tab on a fresh refresh, the sum.ts shouldn't be included as a 
downloaded file. But once you click that button, it becomes included. Any subsequent
requests, won't re-download because the browser caches it on the first download and 
uses the cached version.

+ Conditional code splitting:
- If the user isn't an admin, we wouldn't want to
download or show that data because they don't need it.
Imagine if it was a big admin dashboard as well, and it'd
be pretty bad performance wise. Even if we didn't show it, it
still wouldn't be good if we downloaded that file for all users.
Now let's only download this data or file when the user
is an admin.

1. We wrap suspense around 'AdminData' since that the component we're 
  lazy loading, so we're saying inside content inside it may be lazily loaded.
  However you should note, you can technically still rely on the 'Suspense' in
  NavWrapper to protect you. Of course that would mean when loading the 'AdminData'
  it'll mean you'd be rendering the 'loading screen' intended when you load an entire 
  page.
2. That is why we do a separate 'Suspense' when loading AdminData component or regular 
  markup. As a result, we're only shown the 'loading screen' our SUspense component in our 
  Home page, which makes a lot more sense. You wouldn't want to show a 'loading page screen' 
  when you're simply loading 'AdminData' a small component of the page.
- Conditional Lazy Loading Takeaway: As a result if you aren't 
  an admin, the AdminData component will never be rendered, so the application
  will never download the 'AdminData' component, which is good because regular 
  users won't need it so we don't need it taking up resources when downloading. 
  Else if you are an admin, AdminData component will be rendered, and so AdminData 
  will be called to be imported to do that.


+ Advanced Code Splitting:
- What if rather than showing a fallback state (loading screen),
  you just want to keep rendering the old data until
  the new data has finished loading. We'll use useTransition hook for this.
  Essentially it allows us to do non-urgent updates, so our UI won't 
  change until they finish updating.
1. We merely pass our isAdmin state setter into startTransition.
  As a result, it only changes the UI after the state has changed
  and the 'AdminData' component has been imported/rendered.
2. Also you could use the isPending variable to display a loading screen.




*/

import React from "react";
import { useState, lazy, Suspense, useTransition } from "react";

// Regular imports
// import AdminData from "../AdminData";
// import sum from "../sum";

// const AdminData = lazy(() => import("../AdminData"));

// Importing with intentional wait time of 1 second to simulate delay
const AdminData = lazy(() => wait(1000).then(() => import("../AdminData")));

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1>Home</h1>

      {/* <button onClick={() => alert(sum(2, 2))}>DO: 2+2</button> */}

      <button
        onClick={() => {
          import("../sum.ts").then((module) => {
            alert(module.default(2, 2));
          });
        }}
      >
        DO: 2+2
      </button>

      <button
        onClick={() => {
          startTransition(() => {
            setIsAdmin((prev) => !prev);
          });
        }}
      >
        Transition Admin
      </button>

      {/* Regular vs lazy load */}
      {/* <button onClick={() => setIsAdmin((prev) => !prev)}>Toggle admin</button> */}
      {/* {isAdmin ? <AdminData /> : <h2>You are not an admin!</h2>} */}
      <Suspense fallback={<p>Loading home page data!</p>}>
        {isAdmin ? <AdminData /> : <h2>You are not an admin!</h2>}
      </Suspense>
    </>
  );
}

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
