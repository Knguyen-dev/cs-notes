const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

/*
+ Display list of all BookInstances:

1. We do .populate("book") to get the actual book document in our 'book' 
  property for our models. We set this up in our bookinstance.js and its schema.
  And now we'll be able to access the book's properties inside our template file.
  In our template file we directly make use of this my using 'val.book.title'
  where val is our bookinstance object. 'book' property is a document 
  from the 'books' collection and we're able to access its properties suc has 'title'

- NOTE: Doing populate turns it into the corresponding model object rather than
  a rather than a document, so you can use virtual properties. In this case 
  I can do allBookInstances[0].book.url and it works!

*/
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
	const allBookInstances = await BookInstance.find().populate("book");

	res.render("bookinstance_list", {
		title: "Book Instance List",
		bookinstance_list: allBookInstances,
	});
});

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
	const bookInstance = await BookInstance.findById(req.params.id).populate(
		"book"
	);

	if (bookInstance === null) {
		const err = new Error("Book copy not found!");
		err.status = 404;
		return next(err);
	}

	res.render("bookinstance_detail", {
		title: bookInstance.book.title,
		bookinstance: bookInstance,
	});
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance create POST");
});

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance update POST");
});
