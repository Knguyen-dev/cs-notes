/*
+ Example 1: 

myButton.addEventListener("click", () => {
  console.log("Click")
})

setTimeout(() => {
  console.log("Time out finished")
}, 5000)
console.log("Done")


- Running the script:
1. From top to bottom, we call code to create an event listener. Put 
  that on the stack, and then the result is that it creates 
  an event listener in the web apis section.
2. DO setTimeout which schedules a callback to be run in web apis.
  Immediately after do console.log.
3. Callback should be resolved and put into callback queue. Wait until
  stack is empty to console.log("Timeout finished")

- Clicking the button:
1. Button event listener is a web api, clicking will send a click callback to 
  the callback queue. Then when call stack is empty, we push those callbacks onto
  the stack to run them.



+ Example 2:

1. Regular block will fill the block the callstack like normal.
2. Async block will schedule multiple callbacks with the web api.
  while it's doing this it is filling the callback. So only when asyncForEach 
  has finished scheduling, will the callbacks in the queue be called.

*/

const myList = [1, 2, 3]

// Regular
myList.forEach((n) => {
    console.log(n)
})

// Async
function asyncForEach(arr, cb) {
    arr.forEach(() => {
        setTimeout(cb, 0)
    })
}

asyncForEach(myList, (i) => {
    console.log(i)
})

/*
+ Rendering in the browser (render queue): The browser will repaint/re-render screen every
  16.6 ms or 60 frames a second. However, it's constrained by javascript because
  the browser can't render when there is code on the stack. And while render is 
  blocked, you can't interact with the screen or do anything. So if you 
  put slow code on the stack, the UI is going to be sluggish as the browser 
  isn't able to render as much. Examples would be doing image rendering 
  or some kind of animation, so you'd have to be more clever at structuring
  your code.
  
  
- NOTE: Render in the render queue
  is given higher priority than callbacks in the callback queue.
*/
