/*
+ Book instance: There could be many different version of the same
  book, representing the copies of that book that we have available
  in the library.


*/

const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
  
  - NOTE: This is just the shorthand of doing () => Date.now(). Also while 
    MongoDB stores date values in ISO format in the database, when accessing 
    date values in Mongoose, the model object's .due_back property is actually
    a JavaScript date object.
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

+ Create a virtual property for the book's formatted date:

1. DateTime.fromJSDate(): Used to create a Luxon DateTime object 
  from a JavaScript Date object. 

2. .toLocaleString(preset): Turns a Luxon date time object, into a 
  human readable string that shows the date. By default it 
  shows "4/20/2017", but you can pass a preset. Here we pass 
  DateTime.DATE_MED, which we see abbreviates the date to 
  'April 20, 2017".


+ Credits: All of this is found in this page of the docs
1. https://github.com/moment/luxon/blob/master/docs/formatting.md
  
*/

bookInstanceSchema.virtual("url").get(function () {
	return `/catalog/bookinstance/${this._id}`;
});

bookInstanceSchema.virtual("due_back_formatted").get(function () {
	return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("BookInstance", bookInstanceSchema);
