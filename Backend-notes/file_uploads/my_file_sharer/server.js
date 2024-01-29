/*
+ dotenv: Allows us to connect to a .env file. Now you don't have 
  to do something like 'node --env-file=.some_env_file server.js', rather
  this connects you to the '.env' file, and you can just run your scripts like
  normal
*/
require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const File = require("./models/file");

const express = require("express");
const app = express();

/*
+ Allows express to access form data in the body of a request. Set to true to access nested data

- When form is like this
<label for="address">Address:</label>
<input type="text" id="city" name="address[city]" placeholder="City">
<input type="text" id="state" name="address[state]" placeholder="State">

- You can access form data in nested form like this
console.log(req.body.name);          // John
console.log(req.body.address.city);   // NewYork
console.log(req.body.address.state);  // NY
*/

app.use(express.urlencoded({ extended: true }));

/*
+ Create an upload function: Here we're basically
  saying, all file uploads are going to be stored
  in a folder/directory called 'uploads'. Then
  we can use the upload function as our middleware.
*/
const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");

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
2. Your files will then be uploaded with a completely random name, which 
  prevents files being overwritten in the case you upload files with the same
  names. It creates req.file.path which is the path to where
  the file was downloaded so here "/uploads/some_file_name". The path
  is relative to the current working directory.
 

- Route handling logic:
1. When you use multer, and insert the file upload middle, multer 
  gives your request obj a property called 'file'. So you can use 
  req.file, which represents the file that was uploaded in the form.
  So our file inputs are specifically covered by multer, so let it 
  handle our file path, and the original name of the file.

- NOTE: By default Express doesn't know how to read a normal form with req.body,
  but we're able to do in this route handler only because we included Multer middleware.
*/
app.post("/upload", upload.single("file"), async (req, res) => {
	const fileData = {
		path: req.file.path,
		originalName: req.file.originalname,
	};

	/*
  1. If our password isn't null or an empty string, then the password is defined
  2. We want to store the password's hash, so that even people who have access to our
    database won't know what the passwords are. Good security practices.
    
    Salting: Typically when passwords as hashed, a unique random value known as a 
    salt is added before hashing. As a result, even if two users have the same password,
    their hashed values will be different due to the unique salts. This makes
    it harder for attackers to guess passwords. If we didn't have salts, if two users
    have the same password, their hashes would be identical, making it easier for 
    attackers to identify patterns and bypass our passwords. Now with salting
    when attackers get access to passwords in the database they can't easily identify identical
    passwords, and it makes it harder to computationally break the passwords. Salting adds
    an extra layer of security.

  */
	if (req.body.password != null && req.body.password !== "") {
		fileData.password = await bcrypt.hash(req.body.password, 10);
	}

	const file = await File.create(fileData);

	/*
  + On successful file upload:
  1. render the index page with the link to the file for downloading.
    'req.headers.origin' is just the domain where the request 
    came from. In this case it'd be localhost:3000 because we made the 
    request on that route, but when deployed to a real site, it'd be that
    real site's domain.
  2. We'll construct this link so that when clicking on the link, 
    it runs our route handling function for downloading the file.  
  */
	res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
});

/*
+ Route for downloading our file

- NOTE: app.get for when there is no password, we 
  just prompt the user for a download. app.post happens
  when there is a password and we fill out a form on 
  the /file/:id route, and we have to submit that form.
*/
app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
	const file = await File.findById(req.params.id);

	// If there's a password associated with this file
	if (file.password != null) {
		// If there is no password field, render the password page
		// NOTE: This is helpful on the first time as it will take the user to the password page
		if (req.body.password == null) {
			res.render("password");
			return;
		}

		// If there is a password then compare
		// the input password to our password hash. If they don't match render the password page again
		// but with a message that tells the user that things are incorrect
		if (!(await bcrypt.compare(req.body.password, file.password))) {
			res.render("password", { error: true });
			return;
		}
	}

	file.downloadCount++;
	await file.save();
	console.log(file.downloadCount);

	/*
  + res.download() sends a response which prompts the user to download the 
    file at that path. We enter file.originalName to prompt the download with 
    that file name
  - NOTE: Of course it's not actually possible to know whether or not 
    the user actually downloaded the file to their system, this just 
    prompts the window to download.
  */
	res.download(file.path, file.originalName);
}

app.listen(process.env.PORT);
