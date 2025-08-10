/*
+ Rendering data (views):
- Template (view) engines allow us to pass in data to an 
  template file. Using placeholders for data that will be filled 
  when the template file is created. Express supports a lot of 
  template engines for JavaScript such as Jade, Mustache, Dust, etc.

- As you've probably noticed, we're not going to work with a plain
  old html file in this case, but something a little more advanced. 
  In the sense that it's going to let us define variable names and whatnot.
  We'll get into it later when we start with some example projects.


+ End of the basics:
- Congratulations it's the end of the basics. You should be familiar wtih 
  the benefits of Express such as how it makes it easy to handle HTTP request,
  server-side routing, and has a many libraries to various web-dev tasks.
  At this point you should only roughly understand the main ideas of a 
  Express app (routes, middleware, error handling, templates). However,
  even if you coded along you aren't meant to be able to 100% follow 
  and understand what's happening. You should just be able to somewhat 
  familiar, until we start doing our example projects and start digging in.

  Remember Express itself is actually pretty light weight and small. The 
  main thing is the multitude of libraries that build upon it and make
  it so versatile.

*/

const express = require("express");
const path = require("path");
const app = express();

// Set directory to contain the templates ('views'); so your html files are in the 'views' directory
app.set("views", path.join(__dirname, "views"));

// Set view engine to use, in this case 'some_template_engine_name'
app.set("view engine", "some_template_engine_name");

// Open
app.get("/", function (req, res) {
	res.render("index", {
		title: "About dogs",
		message: "Dogs rock!",
	});
});
