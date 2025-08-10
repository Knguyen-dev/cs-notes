/*
- Finds the '.env' file in the project's directory. Then
  it gets all of those variables, and injects them into the environment 
  for the application to use.



*/
// require("dotenv").config();

/*
+ Working with multiple:
- In a real world scenario, we're working with multiple .env files. One for 
  production, development, testing, staging, etc. Here, if you pass
  in NODE_ENV on the commandline it will load in the value of that 
  .env file.

1. node NODE_ENV='development' app; it will load 
  the .env.development file.
*/

if (process.env.NODE_ENV) {
	require("dotenv").config({
		path: `${__dirname}/.env.${process.env.NODE_ENV}`,
	});
} else {
	require("dotenv").config();
}

console.log(process.env.PORT);
