const { connectToDB, getDb, getBucket } = require("./db");

const fs = require("fs");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// File going into the uploads directory
		cb(null, "/uploads");
	},
	// Here we save the file as its original name
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

/*
- With diskStorage you just have more control over
  where you want your file to go, and how you want 
  to name your file when it's saved.

- In a real server you don't want to save your 
  files inside your server. One of the things you can
  do is using memory storage that multer does, but there
  are better ways to do this by just uploading from
  the browser to whereever you want to store it.
  You'll probably hear about one of the more famous
  ways to store files using Amazon web services though.



*/
const upload = multer({ storage });
// const upload = multer({ dest: "uploads" });
const app = express();
let db;
let bucket;

app.set("view engine", "ejs");

/*
+ Routes:


- index: Render index page with all image files. The 
  reason we are getting broken images at first is 
  that we actually need to get the image sources 
  from the bucket in order to display them.. The image 
  sources are making a get request to the endpoint in
  the 'src' attribute and we need to provide a proper 
  get request
*/

app.get("/", async function (request, result) {
	const files = await bucket.find({}).toArray();
	result.render("index", {
		files: files,
	});
});

app.post("/upload", upload.single("file"), (req, res) => {
	// After we use our middleware we can access our file like so

	const file = req.file;

	// Supposed to represent a unique name for the file in the database?
	const savedFileName = new Date().getTime() + "-" + file.originalname;

	/*
  + Saving file to database:
  1. Read file from where it was temporarily stored
  2. Use a bucket upload stream and save the file as 
    'savedFileName' in the database
  
  */
	fs.createReadStream(file.path)
		.pipe(
			bucket.openUploadStream(savedFileName, {
				// We can define the metadata we want, so
				// we want to record the original name of the file, its size
				// and the type of file that we saved
				metadata: {
					name: file.originalname,
					size: file.size,
					type: file.mimetype,
				},
			})
		)
		// When it's done redirect the user back to the index page
		.on("finish", () => res.redirect("/"));
});

/*
+ Get request for image sources:

1. <img src="image/1706508023706-schumer_box_example.jpg"/>, which means 
  it's trying to do a get request at the endpoint indicated by source to get the actual
  image data. Let's make that route right now!

2. 
*/
app.get("/image/:filename", async (req, res) => {
	const fileName = req.params.filename;

	const file = await bucket
		.find({
			filename: fileName,
		})
		.toArray();

	// Handle case when file wasn't found
	if (!file || file.length == 0) {
		return result.status(404).json({
			error: "File does not exists.",
		});
	}

	bucket.openDownloadStreamByName(fileName).pipe(res);
});

/*
+ Starting server logic:
1. Connect to database. Once established
  we define our variables db and bucket.
2. Express app starts listening
*/
connectToDB().then(() => {
	db = getDb();
	bucket = getBucket();
	app.listen(3000, () => {
		console.log("Listening on port 3000");
	});
});
