const Author = require("../models/author");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

/*
+ Let's make the callback functions that our route handlers will use.
  They're all asynchronous functions since they all involve database
  operations! Then we'll export all of them.

- asyncHandler: Used to catch exceptions thrown in our 
  route handler functions. It's akin to wrapping a 
  try-catch block around the async function you have.
  So if any database operations fail, an exception is thrown 
  and be caught by asyncHandler(). Then hte error will be 
  throw nto the next middleware handler in the chain.

- Callbacks for dynamic routes: Note when we do 
  req.params.id that means this callback is going to 
  be linked to a route with a route parameter 'id'.

*/
// Displays list
exports.author_list = asyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find().sort({ family_name: 1 });

	res.render("author_list", {
		title: "Author List",
		author_list: allAuthors,
	});
});

/*
- req.params.id: Object id of the author in string form
1. Query for the author in the authors collection. In return we 
  get the mongoose author model object.
2. Query the books collection, and find all documents where 
  the 'author' property, which an supposed object id representing a 
  document from the authors collection, matches the current id
  we're querying for.
*/
exports.author_detail = asyncHandler(async (req, res, next) => {
	// Checks whether the Id is even a valid id in the first place
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		const err = new Error("Page Not Found: Invalid Id for Author");
		err.status = 400; // bad request
		return next(err);
	}

	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id),
		Book.find(
			{
				author: req.params.id,
			},
			"title summary"
		),
	]);

	if (author === null) {
		// No results with said id. They
		const err = new Error("Author not found");
		err.status = 404;
		return next(err);
	}

	res.render("author_detail", {
		title: "Author Detail",
		author: author,
		author_books: allBooksByAuthor,
	});
});

exports.author_create_get = asyncHandler(async (req, res, next) => {
	res.render("author_form", { title: "Create Author" });
});

/*
+ Display Author create form on POST.

.withMessage(errMessage): With this, the error message will
  be displayed if the previous validation method fails. Making it very easy to 
  provide specific error messages without lots of code duplication.

.optional({values: falsy}): With this, the field accepts an empty
  string or null value as well. So it's an optional field.

NOTE about dates: The 'yyyy-mm-dd' format misbehaves. JavaScript treats 
the date strings as having the time of 0 hours, and treats date strings
(ISO 8601) as 0 hours UTC rather than local time. So if your time zone is 
west of UTC, the date displayed will be one day before the date you entered.

*/
exports.author_create_post = [
	// Validate and sanitize our fields
	body("first_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("First name can't be blank!")
		.isAlphanumeric()
		.withMessage("First name must be alphanumeric"),

	body("family_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Last can't be blank!")
		.isAlphanumeric()
		.withMessage("Last name must be alphanumeric"),

	body("date_of_birth", "Invalid date of birth")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),

	body("date_of_death", "Invalid date of death")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),

	asyncHandler(async (req, res, next) => {
		// Run our validation and sanitization middleware
		const errors = validationResult(req);

		// Create Author object with escaped and trimmed data
		const author = new Author({
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
		});

		if (!errors.isEmpty()) {
			res.render("author_form", {
				title: "Create Author",
				author: author,
				errors: errors.array(),
			});
		} else {
			// Else form is valid, so save it to the database and redirect our
			// user to the author.url, which we defined in our models. So
			// this would be the author detail page.
			await author.save();
			res.redirect(author.url);
		}
	}),
];

/*
+ Display Author delete form on GET: The gimmic here is that the 
  user has to delete all books associated with an author before actually deleting said author 
  from the database.

*/
exports.author_delete_get = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id),
		Book.find({ author: req.params.id }, "title summary"),
	]);

	// If there wasn't an author for that ID
	if (author === null) {
		res.redirect("/catalog/authors");
	}

	res.render("author_delete", {
		title: "Delete Author",
		author: author,
		author_books: allBooksByAuthor,
	});
});

exports.author_delete_post = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id),
		Book.find({ author: req.params.id }, "title summary"),
	]);

	// If the author has books, render our page again becasue they didn't delete all of the books
	if (allBooksByAuthor.length > 0) {
		res.render("author_delete", {
			title: "Delete Author",
			author: author,
			author_books: allBooksByAuthor,
		});
	} else {
		// Else author has no books, so just delete them and redirect to the list
		// of authors.
		await Author.findByIdAndDelete(req.body.author_id);
		res.redirect("/catalog/authors");
	}

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
