/*
+ Book instance: There could be many different version of the same
  book, representing the copies of that book that we have available
  in the library.


*/

const mongoose = require("mongoose");

const bookInstanceSchema = new mongoose.Schema({
	// Reference to the associated book model from books collection, again starts off as a ID
	book: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Book",
		required: true,
	},

	// Brand the book is published under
	imprint: {
		type: String,
		required: true,
	},

	/*
  - status: Represents the status of the book, default value is 
    maintenance though.
  - enum: Basically creates a validator that checks if 
    the the value is in the given array. 'imprint' must
    be one of those four values when creating a bookInstance
    object.
  */
	status: {
		type: String,
		required: true,
		enum: ["Available", "Maintenance", "Loaned", "Reserved"],
		default: "Maintenance",
	},

	/*
  - We know Date.now is the constructor, but Mongoose is smart and when we do this 
    it knows to make it so that everytime a new document is created, the current time
    stamp is set as the default value.
  
  - NOTE: This is just the shorthand of doing () => Date.now().
  */
	due_back: {
		type: Date,
		default: Date.now,
	},
});

/*
+ Create a virtual property for the book instance's url

- NOTE: Another good use for virtual properties, as you're not going to store 
  a 'path' property in the database. By using Mongoose and virtual properties, 
  it makes it easy to create a route for your model objects, and if you want to change
  the route to something different, it's easy to change.
*/

bookInstanceSchema.virtual("url").get(function () {
	return `/catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model("BookInstance", bookInstanceSchema);
