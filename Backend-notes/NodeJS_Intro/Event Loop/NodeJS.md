# NodeJS (or just Node)

- An asynchronous event driven JavaScript runtime. When JavaScript was first created it can only be run in the browser
  and be used for websites. Node lets you run JavaScript outside of a browser, like in a regular
  script/file. Consequently, this allows JavaScript to be used on the server-side like other
  languages such as Python, Php, etc. To go further, Node has additional functionalities
  such as reading/writing local files, creating http connections, and listening to
  network requests. All of which isn't found in Browser-based javascript.

# V8 JavaScript Engine

- Node is built on this engine.

# Event Driven

- Asynchronous meaning we don't know when things will
  trigger and what parts of our code will trigger. Our code
  will be a collection of functions that get called in response
  to a network request, which is the event.

- For example: We have a program that does two tasks
  1. Read file AND print its contents
  2. Query database AND filter its requests.
- Node starts first task, and then immediately
  begins doing the second tasks as well. Asynchronous as
  we don't wait for tasks to be done. NodeJS does non-blocking
  I/O.

1. Blocking I/O: Can't start task 2, until we
   finish task 1. In a web server, you'd have to start
   a new thread for each new task, but JavaScript is
   "kind of single-threaded", not making it good for
   multi-threaded tasks.
2. Non-blocking: Start a request for task 2 without
   having to wait for a response for task 1. Allowing
   you to start both tasks in parallel.

# Credits:

2. Node Event Loop: https://www.youtube.com/watch?v=8aGhZQkoFbQ
3. Odin Project: https://www.theodinproject.com/lessons/nodejs-introduction-what-is-nodejs
