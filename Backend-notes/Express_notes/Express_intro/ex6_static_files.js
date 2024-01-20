/*
+ Serving static files:
- Use the express.static middleware to serve static files. This is 
  middleware is actually a part of express rather than a third party 
  package.



*/
const express = require("express");
const app = express();

/*
- For example, here we want to serve static files from a directory
named "public" at the same level as where we call node.

  1. http://localhost:3000/css/style.css
  2. http://localhost:3000/images/my_image.png

- NOTE: Express looks up the files relative to the static 
  directory, which is 'public', in this case. Which is why the name
  of the directory is not part of the URL.

*/
app.use(express.static("public"));

/*
- For example, you can serve from multiple directories.
  If the file can't be found by one middleware function, 
  the next one will try it. So here if express can't find the 
  asset in the "public" directory express will check the "media" directory.

*/
app.use(express.static("public"));
app.use(express.static("media"));

/*
- You can create a virtual prefix for your static URLS.
  Here we load files with the "/media" prefix. As a result
  you can load files in hte public directory from the 
  '/media' path prefix.

  1. http://localhost:3000/media/my_image.png
*/
app.use("/media", express.static("public"));
