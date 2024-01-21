/*
+ Methods:
1. myUser.save(): Asynchronous task that allows us to save a user
  to the database.
2. await User.create({ name: "Kyle", age: 26 }); Creates a new 
  user instance, but also saves them to the database, which is why
  it's an async task. 

*/

const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(process.env.uri);

async function ex1() {
	/*
  + Try/catch block: If we put an incorrect datatype, it'll
    raise an error for us!
  
  */
	try {
		const user = new User({
			name: "Kyle",
			age: 27,
			email: "Kyle12@gmail.com",
			hobbies: ["Weight Lifting", "Bowling"],
			address: {
				street: "Main St",
			},
		});

		console.log(user);
	} catch (e) {
		console.log(e.message);
	}

	// const myUser = new User({ name: "Kyle", age: 26 });
	// await myUser.save();

	// Promise syntax of saving a user
	// myUser.save().then(() => console.log("User saved"))
}

async function ex2() {
	try {
		// Find users with the name of 'Kyle'
		// const users = await User.find({ name: "Kyle" });

		// Returns result object with the id if exists, else returns null
		// const users = await User.exists({ name: "Kyle" });

		/*
    + Mongoose's syntax tries to make MongoDB's find function easier to use:
    - Just knows it's just another way to structure the queries.
    1. Finds all users where the name equal to kyle, 
    2. Finds all users where age is greater than 12 and name is 'Kyle'.
    */
		// const users = await User.where("name").equals("Kyle");

		const user = await User.findById("65ad60bbb5ddf1172403b01f");

		// Here we're using our custom query method 'byName'.
		// Remember we can only use this after a 'query' object so after .where() or .find()
		// const user await User.find().byName();

		console.log(user.namedEmail);
		console.log(user.sayHi());

		user.name = "Kyle Lan";
		await user.save();
	} catch (e) {
		console.log(e.message);
	}

	console.log("End of Mongoose Notes!");
}
ex2();
