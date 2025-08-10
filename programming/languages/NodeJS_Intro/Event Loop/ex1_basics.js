/*
+ Callstack:

- Ex.1: Think of the program being run in a function called main. Calling functions pushes them onto stack
  and them finishing takes them off.
1. main() => printSquare(4) => square(4) => multiply(4,4) 
2. main() => printSquare(4) => square(4) 
3. main() => printSquare(4); still calls console.log after received 'squared'
4. Done.

- Ex.2: When an error happens, it prints the stack trace. Basically
  saying we found an error when foo was called.
1. main() => baz() => bar() => foo()
Uncaught Error: Oops!
foo
bar
baz
(anonymous function); our main()

- Ex. 3: We'd get a 'RangeError' saying 'Maximum call stack size exceeded' because
  our browser saw us call the function too many times. So it just ends it for us.
*/

// Ex. 1
function multiply(a, b) {
    return a * b
}
function square(n) {
    return multiply(n, n)
}
function printSquare(n) {
    var squared = square(n)
    console.log(squared)
}
printSquare()

// Ex. 2
function foo() {
    throw new Error("Oops!")
}
function bar() {
    foo()
}
function baz() {
    bar()
}
baz()

// Ex. 3
function recursion() {
    return recursion()
}
// recursion(); just pretend we call it

/*
+ Blocking: Code that is slow basically.

- Ex.1: Let's pretend fetchData() is synchronous. It would be slow
  as we'd have to wait until the previous was finished until we even
  started the next one. Network requests are slow, if these requests
  were synchronous, that means the one task that we're allowed is taken 
  by the request. The browser would be frozen until that request finished.
  The solution is asynchronous callbacks

Callstack:
main() => fetchData(); call function and put on stack
main(); take it off the stack since done
main() => fetchData();
main()
main => fetchData();
* stack cleared



- Ex. 2: Asynchronous callbacks. Everything's asynchronous so there's 
  no blocking. We run code, give it a callback, and schedule that callback for 
  later. The setTimeout is run, immediately scheduling the callback to be called. 
  We don't wait until it's finished and immediately move on. Then later 
  console.log is run, seemingly randomly. But this is where the event loop
  comes in.

Callstack:
1. main() => console.log("Hi")
2. main() => setTimeout
3. main() => console.log("JSConfEU")
4. console.log("There")

Output:
Hi
JSConfEU
There


- JavaScript runtime can only do one thing at a time, so it can't do a network
  request if you're running other code, etc. The reason we're able to do things
  concurrently is because we have the browser and its resources which is separate 
  from the runtime.

+ Browser: Provides additional threads to do tasks and apis such
  as the DOM, fetch() or ajax() to do network requests, or setTimeout.
  Those functions or things aren't apart of the JavaScript runtime or V8.

- How stack, webapis, task queue, and event loop all work together:
1. Call setTimeout, it's an api provided by browser. So
  the webapis section will now have a timer of when to 
  execute the callback. Our setTimeout has been scheduled so 
  take it off the stack and move on.
2. When timer is finished, push callback onto the task queue.
  It's put at the end, hence it's a queue.
3. Event loop, looks at the stack and the task queue. If 
  the stack is empty, take the first thing on the queue and 
  psuh it onto the stack. So once our stack is empty, it takes
  our callback and pushes onto the stack, calling the callback.
4. Run the callback on the stack, and we're done.




- Ex. 3:

1. main() => console.log
2. main()
3. main() => setTimeout(); callback is put onto webapis and immediately finished and put into task queue.
4. main(); However, we don't see 'There' in the output immediately because 'main()' is still
  on the callstack. Our stack isn't empty so our callback of console.log("There") can't be 
  pushed onto the stack and called.
5. main() => console.log("JSConfEU")
6. main()
7. empty call stack
8. console.log("There"); and finally our callback is put onto the stack. 

NOTE: This is exactly how our asynchronous fetch requests work as well. We
  use ajax or fetch, provided by browser as a web api, so our callback with
  our data is put into webapis section. When done, we got the data and 
  we put our callback which will print the data into task queue,
  and when our stack is empty, we call the callback, which will print 
  the data that it received.
  
  - Example of the ajax request 
  $.get("url", (data) => {
    console.log(Data)
  })

*/

// Ex. 1
function fetchData() {
    setTimeout(() => {
        console.log("Done fetching data")
    }, 5000)
}

var a = fetchData()
var b = fetchData()
var c = fetchData()

// Ex. 2
console.log("Hi")
setTimeout(() => {
    console.log("There")
}, 5000)
console.log("JSConfEU")

// Ex. 3
console.log("hi")
setTimeout(() => {
    console.log("There")
}, 0)
console.log("JSConfEU")
