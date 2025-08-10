/*
+ Running Node.js scripts from the command line:
1. node fileName.js; to run 'fileName.js' in the commandline
2. node -e "console.log('Hello World')"; You can pass string arguments instead of file paths to run code like this.

+ Shebang lines: You can include a to tell the OS which interpreter 
  to use when running the script.

+ Restarting the application automatically:
- There's a feature to restart the application when a file changes, which
  is really good for development purposes. By running the line below, your 
  fileName.js will now restart and run whenever you make a change and save the file.

1. node --watch fileName.js; 

*/

console.log("Hi this is example 1")
