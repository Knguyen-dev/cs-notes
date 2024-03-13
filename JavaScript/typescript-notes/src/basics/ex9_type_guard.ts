/*
+ Type guards: When there's the possibility of a variable being multiple
different tyeps, we can use a type-guard to verify whether it's a particular
data-type or not. We can set up conditionals to verify the data-type of a 
variable. Once these conditonals are set up, we can actually use data-type specific
methods without getting an error

*/
type ID = number | string;

function swapIDType(id: ID): ID {
	// If 'id' is a string
	if (typeof id === "string") {
		// Since we put type guard (the conditonal) TS knows this is a string
		// So it allows us to do parseInt on it without errors.
		return parseInt(id);
	} else {
		// Else TS is smart, it knows must only be a number so we can use number methods
		// So we know 'id' is a number, now return its string version
		return id.toString();
	}
}

/*
- Ex.2: Using typeguards with interfaces. We use interface to define 
the structure for our User and Person objects. However in this case 
we can't use 'typeof' because these are complex objects rather than
just primitives. One solution is to use a 'type' interface, which 
just means giving the interfaces a common property, and there you
put a value you can differentiate them with. 

1. So here we put 'type' and put two different hard-coded values 
to differentiate the two interfaces.
2. In the conditional, check for the the 'type' property. User and 
person share this common property, and now we can use it to differentiate
the two data-types.
*/

interface User2 {
	username: string;
	email: string;
	id: ID;
	type: "user";
}
interface Person {
	firstName: string;
	age: number;
	id: ID;
	type: "person";
}

function logDetails(value: User2 | Person): void {
	// Now inside this conditional, TS knows that this 'value' conforms
	// to the 'User' interface so we can use its stuff now.
	if (value.type === "user") {
		console.log(`${value.email} and ${value.username}`);
	} else {
		// Now TS knows value.type === "person" so it has to conform
		// to the 'person' interface.
		console.log(`${value.firstName} and ${value.age}`);
	}

	if (value.type === "person") {
	}
}
