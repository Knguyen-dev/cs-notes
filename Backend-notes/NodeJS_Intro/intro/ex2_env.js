/*
+ Reading environment variables from Node.js:


+ process module: A core or bulitin Node.js module provides the 'env' property which 
  contains all environment variables that were defined the moment the process/program started.

+ How to define environment variables in command line:
1. USER_ID=123 USER_KEY=foobar node app.js; 
2. Then you can have in your code "process.env.USER_ID" to access the
  value of that variable you temporarily created for running this file.
- Now this is good for testing, but in production 
  you'll probably use something different.

+ Using .env files:
- With an .env file you can define environment variables you want to use when 
  running your Node.js application.
1. Create an '.env' file where all of your environment variables are located.
2. Prepare code to access and print it in your js file
3. node --env-file=.env ex2_env.js; Here we run 'ex2_env.js' and link the environment file we want to use
4. node --env-file=.env --env-file=.ex2.env ex2_env.js; You can link multiple environment files as well;

- NOTE 1: Since we put the files in a folder we should update our commands.
1. node --env-file=./env_files/.ex1.env ex2_env.js; linking the ".ex1.env" file
2. node --env-file=./env_files/.ex1.env --env-file=./env_files/.ex2.env ex2_env.js

- NOTE 2: If you define the same variable in multiple env files, the 
  value is overrided by the file defined last when you're running your command.
  For example, node --env-file=.file1.env --env-file=./file2.env, if there are 
  identical variables, the values in .file2.env will take precedence.

- NOTE 3: Environment variables aren't case sensitive. Meaning you
 can access environemnt variables with any casing and it'd work. So you
 define PORT=300, you can access it with process.env.poRT to get the same value.
 So that just places emphasis that you should have different and unique names for 
 each environment variables.

*/

console.log("Port number: ", process.env.PORT)

// Defined in .ex2_env
console.log("Cookies ID: ", process.env.cookie_id)
