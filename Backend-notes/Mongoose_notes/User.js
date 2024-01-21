/*
1. Create our schema so the plan or design for our 'User' document.
2. Then we create a 'User' model, and 'User' in this case is what
  our collection's name is going to be. Then we export our model. 
  Now all of the MongoDB commands such as find, insertMany, delete,
  etc. are available on our user model. We'll use this model as a 
  constructor to also create new user instances.
*/

const mongoose = require("mongoose");

/*
+ If you're using an address schema, your address is more like
  a nested document since it will have an ObjectId as well.

*/
const addressSchema = new mongoose.Schema({
	street: String,
	city: String,
});

const userSchema = new mongoose.Schema({
	name: String,

	/*
  - Specifying an minimum and maximum for a numerical value. 
  Age must be  1 <= x <= 100
  */
	age: {
		type: Number,
		min: 1,
		max: 100,

		/*
    + Custom validation: You cna have your own custom validation
      function passed.
    1. validator is where your custom validation function would go
    2. messaeg is the error message
    3. validate is the object you nest those two in.
    
    + Validation only works when doing .create() or .save():
    - Some methods such as update, updateOne, updateMany, findAndUpdate, etc.
      don't run through the validation you set in Mongoose. However, you 
      can make the above 4 turn on validation, it's off by default though.
      However this isn't really recommended since even turning on update 
      validators has caveats.
    
    - Recommended solution: To update documents in the database and still have
      validation checks on them is to do or chain User.findById() and then use .save()
      when you're done in order to update with validation. Find the document first, and then update your 
      changes to the document with myDocument.save().



    */
		validate: {
			validator: (v) => v % 2 === 0,
			message: (props) => `${props.value} is not an even number`,
		},
	},

	/*
  + Schema validation.
  - Adding additional properties to our email property
  1. Should be a string,
  2. Email is required when creating a User document. So you try to create a user 
    object in the code without an email, you'll get an error.
  3. Emails are always lowercased, so passing lowercase: true will automatically
    lowercase the email string passed. The alternative is uppercase
  4. Email must be a string that's minimum length of 8.
  */
	email: {
		type: String,
		required: true,
		lowercase: true,
		minLength: 8,
	},

	/*
  - Adding additional properties to email.
  1. It's a date property
  2. This property is immutable, as you can't change when it's been created.
  3. We want the current date and time as a default value, so do Date.now(). Note
    that doing new Date(), kind of queries the date once, and it's more like 
    a static value really.
  - Everytime a user instance, the default value for createdAt, will be
    the current date and time it was initialized. And we won't be able to 
    change this property programmatically since it's set as immutable.

  - NOTE: When immutable: true it ignores all attempts at trying to change the value.
    SO doing myUser.createdAt = 54, it won't even raise an error, it simply ignores 
    the command to change the value and keeps my original value constant which is good
  */
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},

	/*
  1. Still a date data type
  2. The default value is Date.now() so when it's created, the last 
    updated value is the same as the createdAt value. However we made this
    mutable, so you can change this as users update their accounts frequently.
  
  */
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},

	/*
  1. indicates it's going to be an object id
  2. The object id references a 'User' model so a document from your User
    collection.
  
  */
	bestFriend: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
	}, // An ObjectId of another user document in the User collection
	hobbies: [String], // An array of strings

	address: addressSchema,
	// address: {
	// 	street: String,
	// 	city: String,
	// },
});

/*
+ Adding methods to a schema:
- By adding methods to a schema, you can allow the instances of your models
  to have those methods. So we could define methods for a user such as 
  .introduce() where they introduce themselvse.
- NOTE: You can't use an arrow function because we're 
  using the 'this.' keyword to reference the instance we're working with.

+ Adding static methods: You can add methods to the model itself rather than
  the instances we're creating. Such as User.find(), you can do User.someFunc()

+ Adding query methods: You can also add query methods if you want.

+ Virtual Properties: When you want to create a property, but you 
  don't want to it be on your document. Here we create a virtual
  property called 'namedEmail' which is just a string with the 
  name of the user and their email. So this property only
  exists in the code, and now you cna do myUser.namedEmail.
  
  This is good for properties or info you want to have throughout
  your code, but you don't want to save to a database since it'd 
  be kind of repetitive. Like in this case, you wouldn't need to 
  save a property like 'namedEmail' because that's just redundant
  or repetitive data being saved to your database.

+ Creating middleware for our schema:
- use the 

*/
userSchema.methods.sayHi = function () {
	return `Hi my name is ${this.name}`;
};

userSchema.statics.someFunc = function () {
	return "This is a static method for User";
};

userSchema.query.byName = function (name) {
	return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("namedEmail").get(function () {
	return `${this.name} <${this.email}>`;
});

/*
+ Create and run middleware before (pre) saving our model:
1. Use .pre and 'save' to indicate we're running a callback
  before saving a user.
2. In this function we update the updatedAt property of the user 
  we're saving.
3. Then we call the 'next()' function to call the next middleware
  which will usually be .save().

- How it works: Everytime we do myUser.save(), this middleware runs before
  we commit our changes to the database. It updates the updatedAt
  property. As a result everytime we call .save(), we update 
  our updatedAt property first, and finally our instance is saved 
  to hte database.
*/
userSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

/*
+ Calling a function after saving: It passes 
  us the document that's been saved. Even though 
  it's post, we call next() because next() is essentially
  the rest of our program:

  save document => doc has been saved => End of Mongoose notes

*/
userSchema.post("save", function (doc, next) {
	console.log(`${doc.name} has been saved to collection!`);
	next();
});

module.exports = mongoose.model("User", userSchema);
