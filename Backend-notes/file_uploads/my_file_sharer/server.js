/*
+ dotenv: Allows us to connect to a .env file. Now you don't have 
  to do something like 'node --env-file=.some_env_file server.js', rather
  this connects you to the '.env' file, and you can just run your scripts like
  normal
*/
require("dotenv").config();

const path = require("path");
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();

/*
+ Create an upload function: Here we're basically
  saying, all file uploads are going to be stored
  in a folder/directory called 'uploads'. Then
  we can use the upload function as our middleware.
*/
const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.uri);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index");
});

/*
- Explaining our file upload middleware
1. Before we handle our request, we do our uploading logic. 
  upload.single("file") means we are expecting to receive a single file. 
  'file' is the value of the name attribute of the input field 
  that contains our file. Now before we handle our request 
  in our main route-handling function, the file on the input field
  will be stored in a folder 'uploads'.
2. Your files will then we uploaded with a completely random name, which 
  prevents files being overwritten in the case you upload files with the same
  names.
 

- Route handling logic:
1. When you use multer, and insert the file upload middle, multer 
  gives your request obj a property called 'file'. So you can use 
  req.file, which represents the file that was uploaded in the form.
  So our file inputs are specifically covered by multer, so let it 
  handle our file path, and the original name of the file.

2. 
*/
app.post("/upload", upload.single("file"), (req, res) => {
	const fileData = {
		path: req.file.path,
		originalName: req.file.originalname,
	};

	/*
  1. If our password isn't null or an empty string, then the password is defined
  2. We want to store the password's hash, so that even people who have access to our
    database won't know what the passwords are. Good security practices.

  */
	if (req.body.psasword != null && req.body.password !== "") {
		fileData.password = bcrypt.hash(req.body.password);
	}
});
app.listen(process.env.port);
