/*
- Ex.1: When defining an array, you use []. Here we 
define an array of strings for variable 'names'!
Then with 'ages' we define an array of numbers. Now 
if we try to push or put an object of invalid type 
into these arrays, Typescript will catch that and 
give us an error, which is good.
    
*/
let names: string[] = ["Mario", "Luigi", "Peach"];
let ages: number[] = [25, 30, 40];

names.push("Yoshi");
ages.push(50);

/*
- Ex.2: 
1. Type inference with arrays. Typescript can of course 
infer the types inside an array. In this array 'fruits' since
the array is full of strings, Typescript will infer that it 
is an array of strings, and so any attempt to push anything that 
isn't a string will be rejected by typescript.

2. With 'f' Typescript infers its type based on the type 
of the array that it comes from. So since fruits is an array 
of strings, then f will be typed as a string. 

3. Similarly, when our array is filled with elements of various
different data-types (aka 'union-type' because of 'union' OR symbol), 
then the Type of the array of the 'union' of the types within it.
So here an things is typed with 'number | boolean | string' so 
an element of things can be a number, boolean, or a string. So 
't' is a variable that's typed as 'number | boolean | string' which 
is the same as the array it takes from.
*/
let fruits = ["Apple", "Banana", "Orange"];

// Typescript infers this is a string as well.
const f = fruits[2];

// Typescript infers this is a number | boolean | string
let things = [1, true, "hello"];

// so t is typed as a number | boolean | string
const t = things[2];

/*
- Ex. 3: Typing an object literal (A javascript object). To 
type an object, you write out the entire object, similar to doing 
prop types. So this user variable must be an object that has firstName as a string, 
age as a number, and id as a number.

- NOTE: You cannot add new properties if they are not defined
in the original type.
*/

let user: {
	firstName: string;
	age: number;
	id: number;
} = {
	firstName: "Mario",
	age: 25,
	id: 1,
};

user.firstName = "Peach";

// Bad
// user.email = "Peach@gmail.com";

/*
- Ex. 4: Type inference with object literals. Here 
it inferred that firstName property is a string, whilst
score will be a number. So you must abide by those
rules when changing those properties.

*/
let person = {
	firstName: "Mario",
	score: 35,
};

person.firstName = "Luigi";
person.score = 45;

// Inferred as a number from the 'person' object.
const someScore = person.score;
