const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
	const allGenres = await Genre.find().sort({ name: 1 });

	res.render("genre_list", {
		title: "Genre List",
		genre_list: allGenres,
	});
});

/*
+ Display detail page for a specific Genre:

1. Remember when doing the technique of having the object id as 
  one of our route parameters, normally you'd have to convert it 
  to an objectId, but Mongoose's findById accepts a string for the 
  object Id.

2. We want to find the genre and its information, but also all of the 
  books that have that genre. 
  
  1. If we want to explicitly find a single document by its object id, 
    we use Mongoose's findById, and we can pass in the object id as a string.
  2. Then we query Book documents, where the object id value is a value in their
    genre array. Also for the genres we just want the 'title' and 'summary' fields
    We will do Promise.all to execute them in parallel, so we don't have 
    to do something like:

    1. await query1;
    2. await query2; which would make us wait for query 1 to finish before starting query2 

*/
exports.genre_detail = asyncHandler(async (req, res, next) => {
	const [genre, booksInGenre] = await Promise.all([
		Genre.findById(req.params.id),
		Book.find(
			{
				genres: req.params.id,
			},
			"title summary"
		),
	]);

	/*
  1. if genre was not found in the database, probably deleted
    in this case, we want to create an error object and 
    pass it to the next middleware in the chain.
  
  */
	if (genre === null) {
		const err = new Error("Genre not found!");
		err.status = 404;
		return next(err);
	}

	res.render("genre_detail", {
		title: "Genre Detail",
		genre: genre,
		genre_books: booksInGenre,
	});
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
	res.render("genre_form", { title: "Create Genre" });
});

/*
+ Handle Genre create on POST.
+ Accessing form input values in a post request. 
- Remember, form fields are put in the body of the POST request like 
  key-value pairs. Let's do some server-side form validation.
  
- NOTE: 
  1. See how instead of exporting a single function, we're exporting 
  and structuring it as an array of middleware fucntions. Our array
  will contain our validation and then the route handler.
*/

exports.genre_create_post = [
	/*
  - Validate and sanitize the 'name' field. 

  1. Form field with a 'name' attribute, we target its value. We create our 
    error message as well.
  2. Remove leading and trailing whitespace
  3. Ensure the input is at least 3 characters.
  4. Escape all html characters, prevent malicious 
    content from being sent. It removes any dangerous HTML characters.
  
  */
	body("name", "Genre name must contain at least 3 characters!")
		.trim()
		.isLength({ min: 3 })
		.escape(),

	// Our actual route handler function
	asyncHandler(async (req, res, next) => {
		/*
    - We validate the form fields sent in the POST request. Again
      this is validated gainst the rules we defined above.
    
    1. We're doing toLowerCase() for so there are no near duplicates 
      'Fantasy' is a duplicate of 'fantasy'.
    */
		const errors = validationResult(req);

		const genre = new Genre({ name: req.body.name.toLowerCase() });

		/*
    - If there are errors, render the form again, with sanitized values/error messages.
      We return to exit the route handler function early.

    - Else there are no errors:
    1. If there is already a genre with the name they entered, then we just redirect
      the user to the url of that genre. This should take them to the genre detail page.

    2. Else it's a new genre, so we save it to the database. Then we redirect the user 
      to the url of that genre.
    */
		if (!errors.isEmpty()) {
			res.render("genre_form", {
				title: "Create Genre",
				genre: genre,
				errors: errors.array(),
			});
			return;
		}

		const genreExists = await Genre.findOne({ name: req.body.name });
		if (genreExists) {
			res.redirect(genreExists.url);
		} else {
			await genre.save();
			res.redirect(genre.url);
		}
	}),
];

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre update POST");
});
