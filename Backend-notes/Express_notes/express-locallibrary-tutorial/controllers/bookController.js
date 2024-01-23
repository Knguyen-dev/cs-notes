const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

/*
+ Mongoose Methods:
1. model.countDocuments(filterObj, cb): Returns a query object that will that will return the 
  count of all documents in a colllection that matches the filter. When passed an empty filter 
  object, MongoDB does a collection scan (scans all documents in collection).
   Note this functions makes
  query objects, so you have to run the query to search the database and eventually get the 
  number of objects that match a filter

2. queryObj.exec(): Executes a query object on the database collection.


- NOTE: Although find() does return a query object, if you do 'await' on it, then Mongoose
  simply executes the queyr uatomatically and returns the result.
*/
exports.index = asyncHandler(async (req, res, next) => {
	// Get data from database, executed in parallel, and we wait until all queries
	// are finished before moving on.
	const [
		numBooks,
		numBookInstances,
		numAvailableBookInstances,
		numAuthors,
		numGenres,
	] = await Promise.all([
		Book.countDocuments({}),
		BookInstance.countDocuments({}),
		BookInstance.countDocuments({ status: "Available" }),
		Author.countDocuments({}),
		Genre.countDocuments({}),
	]);

	res.render("index", {
		title: "Local Library Home",
		book_count: numBooks,
		book_instance_count: numBookInstances,
		book_instance_available_count: numAvailableBookInstances,
		author_count: numAuthors,
		genre_count: numGenres,
	});
});

/*
+ Display list of all books:
1. Finds all book documents, we only want their 'title' and 'author' fields. (_id field is always returned as well)
2. We want to sort the array of documents in ascending order.
3. We want to populate the 'author' field, so author will be the model/document
  instead of the object Id. As a result, we'll be able to access 
  the author's information such as their 'name' and so on in our template file.
*/
exports.book_list = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, "title author")
		.sort({ title: 1 })
		.populate("author");

	res.render("book_list", {
		title: "Book List",
		book_list: allBooks,
	});
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
	// if (mongoose.Types.ObjectId) {

	// }

	const [book, bookInstances] = await Promise.all([
		Book.findById(req.params.id).populate("author").populate("genres"),
		BookInstance.find({
			book: req.params.id,
		}),
	]);

	if (book === null) {
		const err = new Error("Book not found");
		err.status = 404;
		return next(err);
	}

	res.render("book_detail", {
		title: book.title,
		book: book,
		book_instances: bookInstances,
	});
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book update POST");
});
