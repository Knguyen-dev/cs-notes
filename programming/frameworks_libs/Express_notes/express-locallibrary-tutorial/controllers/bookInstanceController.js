const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Book = require("../models/book");

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

/*
+ Display BookInstance create form on GET:
1. Fetch all books, but only their 'title' field, and sort them by their titles in ascending order.
2. Render the bookinstance_form template file

*/
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, "title").sort({ title: 1 });
	res.render("bookinstance_form", {
		title: "Create BookInstance",
		book_list: allBooks,
	});
});

/*
+ Handle BookInstance create on POST.
1. Obviously santiize the data. So .optional makes validation optional
  for falsy values, meaning if the field is empty or evaluates to false, 
  it's considered valid. However, if there is a value, then it moves past 
  .optional(), and continues with the validation and move to .isISO6801(). 
  If it's in the right format, then .toDate() is used to convert the 
  string into a JavaScript date object, which is accepted in our schema.


  - NOTE: Remember that input type date will return date string in 
    ISO8601 format.


*/
exports.bookinstance_create_post = [
	body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
	body("imprint", "Imprint must be specified")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("status").escape(),
	body("due_back", "Invalid date")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),

	asyncHandler(async (req, res, next) => {
		// Clean and sanitize data
		const errors = validationResult(req);

		// Create book instance with that cleaned data
		const bookInstance = new BookInstance({
			book: req.body.book,
			imprint: req.body.imprint,
			status: req.body.status,
			due_back: req.body.due_back,
		});

		if (!errors.isEmpty()) {
			const allBooks = await Book.find({}, "title").sort({ title: 1 });
			res.render("bookinstance_form", {
				title: "Create BookInstance",
				book_list: allBooks,
				selected_book: bookInstance.book._id,
				errors: errors.array(),
				bookinstance: bookInstance,
			});
		} else {
			// Else the form data is valid so save the book instance and redirect
			// the user to its url
			await bookInstance.save();
			res.redirect(bookInstance.url);
		}
	}),
];

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
