
# Packages:
1. cookie-parser: Used to parse cookie header and populate 
  request.cookies. Just gives us an easy way to access cookie information.
2. debug: Debugging utility tool.
3. morgan: An HTTP request logger middleware package.
4. http-error: Creates HTTP errors when we need them. Good
  for express error handling.


# Files:
1. www.js: Our entry point javascript file. It imports the actual express app
  object from 'app.js'. It sets the port, either to an environment variable or 
  port 3000. Finally it creates and starts an http server. Everything else is 
  boilerplate code that's not relevant.
2. app.js: Creates express application object 'app' and exports it. 

# Setup:

1. express express-locallibrary-tutorial --view=ejs; Generated the application via express application generator with ejs as view engine
2. Uninstalled 'cookie-parser', 'debug', 'http-errors' and 'morgan'. Then
   reinstalled them to get their latest versions.
3. Changed var to const in app.js. We left 'bin/www' alone, didn't touch it.

4. Run the below command in Windows Powershell to start the server:
  $ENV:DEBUG = "express-locallibrary-tutorial:*"; npm start


- NOTE: 
1. So it sets the environment variable 'DEBUG' to 'express-locallibrary-tutorial:*'.
  So this often enabled for debugging Nodejs applications. Setting up debugging for the 
  'express-locallibrary-tutorial' module, which is our project. The semi-colon ';' is used to 
  separate multiple commands, so right after it executes the npm start script.
2. Specifying the DEBUG variable enables console logging/debugging. We'll
  make this more simple and comfortable with nodemon and npm scripts.
- For getting to the directory
cd "onedrive/desktop/Sdev 265/CS-Programming-Notes/Backend-notes/Express_notes/express-locallibrary-tutorial"




# Killing ports:
- Sometimes we may have left a server running. 
  Do 'npx kill-port 3000', to kill any server 
  on port 3000.
