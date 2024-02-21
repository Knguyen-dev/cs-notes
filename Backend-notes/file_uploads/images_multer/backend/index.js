require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");
const app = express();
app.use(cors()); // allows cross origin requests
app.use(express.json()); // lets us parse json from request body

/*
- Serve all assets from public directory. This 
allows us to serve our images. So doing a get 
request to http://localhost:3000/public/images/some_image.png 
would let us get that image from our front

*/
app.use(express.static("public"));

/*
- Disk Storage: Remember we use multer for handling 
  'multipart/form-data', which is when forms have file 
  data and we need to upload that from client to server.
  However it's also used for storing files using 'diskStorage'
  which saves files to a physical folder on the server's disk. 
  For smaller apps this is sufficient and easier to manage!

1. I created a 'public/images' which is the location where
   we'll store our images.
2. Make a function to create a the filename we're going to save
  to that destination.


*/
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// first param is error, and second is just the path you'll enter for the directory you'll store your images
		cb(null, "public/images");
	},

	/*
  - Create a unique name for the files we're saving. 
    Here we're concatenating a 'fieldname', which is the name
    of the input field it has, the date, and 
    then the file's extension to the name.

    So our fieldname we made was 'file', so our file names are 
    going to be like "file_2392093.png" or something like that.
  
  */
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});

/*
- Define our middleware function that uploads the file 
  to our multer storage. Now we do upload.single("file")
  so it looks for file with field name "file"

*/
const upload = multer({
	storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
	/*
  - Create new user in database with that uploaded image file.
    Here we're assigning 'image' to the file's saved name. As a result
    we'd be able to search for and find the file for this user later
    based on the saved filename.
  */

	User.create({ image: req.file.filename })
		.then((result) => res.json(result))
		.catch((err) => console.log(err));
});

app.get("/getImages", (req, res) => {
	// Get all users, which gets all images in this case since
	// a user is just an image in this case
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");

		app.listen(process.env.PORT, () => {
			console.log(`App listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
