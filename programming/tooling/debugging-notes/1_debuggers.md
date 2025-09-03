# Code Debuggers

## Introduction to Debuggers: VSCode Debugger
A debugger is a tool that helps you step through your program, see various different values, and ultimately help you debug your code. For the most part you can access a debugger through your IDE, but also there are some tools that are debuggers standalone. Usually when people debug, people print out to the console. That's fine for simple applications. For complicated programs, it's better to use a debugger.

We can use **breakpoints** to tell the debugger at what point to stop in the program so that we can see various states at that point. Your debugger doesn't stop running the program unless we place a breakpoint. 

In VSCode on the left side, it'll show you two main sections: local and globals, showing the variables at the local and global scope. There's a lot of clutter like pointers to functions and modules you've imported, which are useless. Here's the workflow: 

- **Create Breakpoint:** First set a breakpoint. Your program will stop at this breakpoint. It will not run the code at the breakpoint or after it. This pauses the program at a specific point in time.
- **Use an Operation:**
  - **Step Over:** Typically indicated by a curved arrow. Run the next line of code, but we "step over" since we don't care about what's happening in the line. For example if you step over a function call, we ran that function, but we aren't going through every line in that function. Good when you have a function, that you know the error isn't at or you don't care to analyze the states at the time of the function. 
  - **Step In:** Typically indicated by down arrow. Go to the next line of code, but if it's a function that you've defined, we actually analyze that function line by line.
  - **Step Out:** Typically indicated by up arrow. If you're done analyzing a function, you can do this operation to finish the function and go onto the next line of code.
  - **Continue/Play:** If you have multiple breakpoints, you can press "continue" multiple times to skip ahead to the next breakpoint. 

- Your variables change on the debugger pane when they actually update, go out of scope, etc. Most debuggers don't allow you to reverse a step though. You should set breakpoints for that.
- To use a debugger in vscode, open a source code file and hit the run and debug in VSCode.
- Your debugger also shows you the call stack which is great, showing you what was returned from the most recent function call alongside any local variables. 
- You can also "watch" to watch very specific expressions. For example you can enter `nums[:5]` when you want to keep an eye on the first 5 elements in the `nums` array.

## Credits
- [How to Use a Debugger - TechWithTim](https://www.youtube.com/watch?v=7qZBwhSlfOo)