/*
+ Book: the book that an author wrote. 
*/

const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
	// Title is a required string
	title: {
		type: String,
		required: true,
	},

	// author is an ObjectId of an 'Author' model, so when you populate this value
	// we'll fetch the document with the corresponding id from the 'authors' collection.
	author: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Author",
	},
	summary: {
		type: String,
		required: true,
	},
	isbn: {
		type: String,
		required: true,
	},

	// Accepts an array of object Ids that reference 'Genre' model objects or documents
	// Again, doing .populate("genres") will fill these with the real Genre objects
	genres: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Genre" }],
});

/*
- Virtual url property we created
- NOTE about url: If your current URL is 'http://ocalhost:3000/catalog/books' and 
yo uhave an anchor tag with href="/catalog/book/my_book_id", the browser 
creates the full url by taking the base url and relative path of the href.
This results in 'http://localhost:3000/catalog/book/my_book_id', as the 
browser intelligently resolves the relative path.
*/
bookSchema.virtual("url").get(function () {
	return `/catalog/book/${this._id}`;
});

/*
+ Export our "Book" model, and when we use it it'll create a 'books' collection.
  We'll use the string 'Book' to reference the book model and its collection in
  other schemas 
*/
module.exports = mongoose.model("Book", bookSchema);
