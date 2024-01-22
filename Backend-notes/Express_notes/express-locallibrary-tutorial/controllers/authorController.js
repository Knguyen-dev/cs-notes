const Author = require("../models/author");
const asyncHandler = require("express-async-handler");

/*
+ Let's make the callback functions that our route handlers will use.
  They're all asynchronous functions since they all involve database
  operations! Then we'll export all of them.

- asyncHandler: Used to catch exceptions thrown in our 
  route handler functions. 

- Callbacks for dynamic routes: Note when we do 
  req.params.id that means this callback is going to 
  be linked to a route with a route parameter 'id'.


*/
// Displays list
exports.author_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author List");
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
});

// Display Author create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author create GET");
});

// Handle Author create on POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author create POST");
});

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author update POST");
});
