/*
+ Functions in typescript: We're going to be focusing on 
defining the datatype for the 'arguments' of the function, 
and then defining the datatype for the return value of the function
*/

/*
- Ex. 1: Here we define that 'a' and 'b' are numbers.
Then we define the return type as a number.
*/
function addTwoNumbers(a: number, b: number): number {
	return a + b;
}

// With an arrow function
const subtractTwoNumbers = (a: number, b: number): number => {
	return a - b;
};

addTwoNumbers(2, 3);
subtractTwoNumbers(4, 2);

// Here the return value is 'void', meaning we don't return anything.
function addAllNumbers(items: number[]): void {
	const total = items.reduce((a, b) => a + b, 0);
	console.log("Total: ", total);
}

/*
- Ex. 2: With return type inference, Typescript will infer 
the datatype of the return value of the function for us.
Here it infers that the return value is a string, well 
since we're obviously returning a template string. So
you may not need to expilcitly define the return type.
Though of you don't define return type, you can still
return like a number like in our second example.


*/
function formalGreeting(name: string, greeting: string) {
	return `${greeting}, ${name}`;
}

function badGreeting(name: string, greeting: string) {
	return 10;
}
