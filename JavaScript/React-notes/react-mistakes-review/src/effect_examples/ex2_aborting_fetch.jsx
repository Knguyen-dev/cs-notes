/*
+ Ex 2: Using abort controllers in effects is good practice.


*/
import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  /*
  - ISSUE: But what would happen if our url quickly changes causing us to fire
  multiple different requests?
  Let's visualize with this example showing when our requests fire and when
  they finish.

  1. 0ms + 150ms = 150ms
  2. 100ms + 300ms = 400ms
  3. 200ms + 100ms = 300ms
  
  - Analyze: In this case, Request1 finishes first, Request3 finishes second, and 
Request2 finishes last. For us this would make our data out of sync as we wanted 
to get Request3's data, but due to the randomness of network latency we have Request2's 
data and we're out of sync. 

- Solution: The solution is we make it so whenever we refire this request, due to a url 
change or the component unmounting, we cancel the current request happening. As a result 
in the example earlier, before doing Request2, we would cancel Request1, and then before 
doing Request3, we would cancel Request2. As a result we would get Request3's data, and 
and so we would be in sync. As well as this, it prevents memory problems that 
occur when we try to update the state of something that isn't mounted on the DOM.
  
    */
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => setData(response.json()))
  //       .catch((err) => setError(err.message))
  //       .finally(() => setIsLoading(false));
  //   });

  // Good request that has cancellation
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((response) => setData(response.json()))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  });
};
