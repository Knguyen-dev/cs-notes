const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

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
	const [allAuthors, allGenres] = await Promise.all([
		Author.find().sort({ family_name: 1 }),
		Genre.find().sort({ name: 1 }),
	]);

	res.render("book_form", {
		title: "Create Book",
		authors: allAuthors,
		genres: allGenres,
	});
});

/*
+ Handle book create on POST: 
- Like our other examples, we can put all our functions that are involved in
  processing the form data into a an array. So it kind of acts like a middleware 
  stack for handling this route. 

1. With checkboxes, the browser may send an array of values associated with the 
  the name of that checkbox. So if the user selects multiple genres, checkboxes,
  then the request body will have 'genre': [input_value1, input_value2]. However if 
  they only select one checkbox, it's just a single value back so genre: input_value.
  So if 'undefined' then there is no 'genre' key so no input elements with 
  'genre' was selected or filled so we return an empty array. Else it'd be a string 
  so only one genre input element was filled. 


  - Main takeaway or rule:
  1. When multiple input fields share the same name attribute and the user selects
    or fills out their values, the browser sends the values as an array under that 
    attribute name in the request body.
  2. When it's only one input field with a specific name attribute is selected/filled out,
    the browser just sends that single value under that attribute in the request body,
    no array in this case. Because of that, since the user can select only one checkbox
    with the name attr 'genre', then we'll get a string, so we need to convert that into
    an array to match our schema.



2. Do server-side validation and sanitization of input. You may notice that 
  we sanitize the 'genre' differently. We do 'genre.*' wildcard selector, which allows us to 
  sanitize all elements in the 'genre' array that's in our request body.
3. Then our actual form handling function that saves the instance into the database.

- NOTE: Doing res.render() doesn't automatically exit the function. If there's code after it 
  then that code will run. However, since we essentially don't have any code after our res.render 
  functions or our redirects, that practically ends the function.

*/
exports.book_create_post = [
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre =
				typeof req.body.genre === "undefined" ? [] : [req.body.genre];
		}
		next(); // Go to the next middleware, which is our sanitization functions
	},

	body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
	body("author", "Author must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
	body("genre.*").escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const book = new Book({
			title: req.body.title,
			author: req.body.author,
			summary: req.body.summary,
			isbn: req.body.isbn,
			genres: req.body.genre,
		});

		if (!errors.isEmpty()) {
			const [allAuthors, allGenres] = await Promise.all([
				Author.find().sort({ family_name: 1 }),
				Genre.find().sort({ name: 1 }),
			]);

			/*
      - Mark 'checked' as true for all genres in the database that are present 
        on the book. As a result we keep all of the checked genres from the last time
        they tried to submit the form. 

      - NOTE: Remember the genres, is just an array of object ids in the form of strings
      */
			for (const genre of allGenres) {
				if (book.genres.includes(genre._id)) {
					genre.checked = "true";
				}
			}
			res.render("book_form", {
				title: "Create Book",
				authors: allAuthors,
				genres: allGenres,
				book: book,
				errors: errors.array(),
			});
		} else {
			// Data from form is valid, so save the book and redirect the user to the
			// url of that book.
			await book.save();
			res.redirect(book.url);
		}
	}),
];

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
	const [book, allAuthors, allGenres] = await Promise.all([
		Book.findById(req.params.id).populate("author"),
		Author.find().sort({ family_name: 1 }),
		Genre.find().sort({ name: 1 }),
	]);

	if (book === null) {
		// No results for the book,

		const err = new Error("Book not found");
		err.status = 404;

		// Send it to the error handling middleware,
		// Also we must return to stop the function call early. Calling next does not
		// automatically exit the function, but we want to, so we put a return statement
		return next(err);
	}

	// Mark our selected genres as checked.
	allGenres.forEach((genre) => {
		if (book.genres.includes(genre._id)) genre.checked = "true";
	});

	// We'll just render the book form
	res.render("book_form", {
		title: "Update Book",
		authors: allAuthors,
		genres: allGenres,
		book: book,
	});
});

/*
+ Updates a book: 

1. We take the book data, and render it on the book_form page or template. Note that we 
  create a book on the '/catalog/book/create' route, while we update a book on the 
  'catalog/book/some_book_id/update' route. Two completely different routes, which is 
  good since we don't have multiple of the same request handlers on the same route.
  Also this style of, creating a form component, that doesn't specify the 'action' 
  works well, because when you don't specify the action, it sends a POST request to 
  the current route. This allows us to reuse our form component in the situation where
  we're 'creating a user', and then later in the settings we let the user edit their 
  account.
  


*/
exports.book_update_post = [
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre =
				typeof req.body.genre === "undefined" ? [] : [req.body.genre];
		}
		next();
	},

	// Validate and sanitize fields.
	body("title", "Title must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("author", "Author must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
	body("genre.*").escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		// Create a Book object with escaped/trimmed data and old id.
		const book = new Book({
			title: req.body.title,
			author: req.body.author,
			summary: req.body.summary,
			isbn: req.body.isbn,
			genres: req.body.genre,
			_id: req.params.id, // This is required, or a new ID will be assigned!
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all authors and genres for form
			const [allAuthors, allGenres] = await Promise.all([
				Author.find().sort({ family_name: 1 }).exec(),
				Genre.find().sort({ name: 1 }).exec(),
			]);

			// Mark our selected genres as checked.
			for (const genre of allGenres) {
				if (book.genre.indexOf(genre._id) > -1) {
					genre.checked = "true";
				}
			}
			res.render("book_form", {
				title: "Update Book",
				authors: allAuthors,
				genres: allGenres,
				book: book,
				errors: errors.array(),
			});
		} else {
			// Data from form is valid. Update the record.
			const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {});
			// Redirect to book detail page.
			res.redirect(updatedBook.url);
		}
	}),
];
