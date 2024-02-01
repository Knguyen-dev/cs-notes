const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
		load: {
			type: Number,
			required: true,
		},
	},
	/*
  - with toJSON: So when we send our model objects over as json data, they
    lose their methods, special properties, etc. because now they're just 
    javascript objects. HOWEVER, by doing toJSON: true, when our model objects
    are being converted to json, they keep their virtual properties!

  NOTE: We'll talk more about this later when we get this working 

  - With timestamps: true, Mongoose automatically adds two fields 
    'createdAt' and 'updatedAt'. These track when documents are created and 
    updated respectively. This makes things easier than adding these fields to 
    your schema and explicitly handling the process of updating the fields.
  */
	{
		toJSON: { virtuals: true },
		timestamps: true,
	}
);

module.exports = mongoose.model("Workout", workoutSchema);
