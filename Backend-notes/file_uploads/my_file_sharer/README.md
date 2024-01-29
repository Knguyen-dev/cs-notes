# my_file_sharer:

- A password protected file sharing site. You can upload a file, click share,
  and it generates a link that others can click on. Clicking on the link prompts them to download
  the file. However if you choose to give it a password, when clicking on the link you're redirected
  to a page where you have to enter the password first in order to download the file. If password
  is incorrect we tell the user, else we prompt the user to download a file.

# Project setup:

- Express for route handling. Mongoose for working with our mongodb database.
  Multer takes care of file uploads for us becasue by default express doesn't do
  that. Ejs is our templating language. bcrypt handles hashing passwords.
  dotenv lets us have an env variable file. Then nodemon is used for
  hot-reloading.

1. npm i express mongoose multer ejs bcrypt dotenv
1. npm i -D nodemon;
