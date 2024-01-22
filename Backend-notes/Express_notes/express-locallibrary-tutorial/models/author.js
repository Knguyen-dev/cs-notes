const mongoose = require("mongoose");

/*
+ Author Schema: Represents the author of a book. The first and family name
 are required strings with a maximum length. However the dates of 
 birth are death aren't required information.
*/
const authorSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
		maxLength: 100,
	},
	family_name: {
		type: String,
		required: true,
		maxLength: 100,
	},
	date_of_birth: {
		type: Date,
	},
	date_of_death: {
		type: Date,
	},
});

/*
+ Author virtual properties:

- name: Created virtual property for getting the full name of the author,
  and this is a good choice since we can derive that value from already
  stored information, so we don't need to store fullname in the database.
  We also handle the case where either one the first or last name is undefined
  so we return an empty string, but that typically wouldn't happen since we 
  put required on those values.


- url: The route or url for an individual author. We'll use 
  this later on in our templates whenever we need to get a link to a 
  particular author. And of course we'll implement hte route 
  handling later on as well.
*/
authorSchema.virtual("name").get(function () {
	if (this.first_name && this.family_name) {
		return `${this.family_name}, ${this.first_name}`;
	} else {
		return "";
	}
});

authorSchema.virtual("url").get(function () {
	return `/catalog/author/${this._id}`;
});

/*
+ Export our model: Here we call our model 'Author', which is going to be the 
  name of our document, they are 'Author' documents. That's used when we do 'ref', but
  and collection name will be based on this string, so Mongoose
  will make it the 'authors' collection. 
*/

module.exports = mongoose.model("Author", authorSchema);
