/*
+ Union Types: A way to let a variable can be one of several different 
types.
*/

/*
- Ex. 1: Here someId can be either be a 'number' or a 'string'. Then
we create a variable 'email' which can be a string or null. This would 
be used if in your application, if the user is logged in they have an
email, else it's null.
*/
let someId: number | string;
someId = 1;
someId = "ab21";
let email: string | null;

/*
- Ex.1: Define type alias 'Id' which is a data-type that can be a number or string.
Now when you use this, you don't have to write out the 'union type' syntax every time.
So 'anotherId' is of custom data-type 'Id' which can be a number or string.
*/
type Id = number | string;
let anotherId: Id;
anotherId = 5;
anotherId = "309j23d-dj";

/*
- Ex. 3: Pitfall with union type. When using a union type 
we can only use properties or methods common all types 
defined in the union type. Here, even if 'id' is a string
we're not allowed to do 'parseInt' because TS doesn't know that.
TS doesn't know 100% that it's going to be a string that we 
can do parseInt on, so it's going to be an error. You can only
use methods/props common to both numbers and strings in this situation.

- NOTE: The way around this? A type guard, and we'll get into that next.
*/

function swapIdType(id: Id): Id {
	return id;
}
