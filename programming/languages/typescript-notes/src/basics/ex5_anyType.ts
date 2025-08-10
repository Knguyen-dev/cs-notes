/*
+ Any type: Allowing a variable to be of any data type. There are probably 
scenarios where is is applicable. Using any type is kind of like a cheat-code
or escape hatch, as you should use it sparingly. If you're using any-type
a lot then you're not really benefiting from using TS, and it's 
almost like you're back using regular JS.

+ Takeaway: Good when you're migrating from JS to TS. As 
when you're starting to convert thigns, you're probably going to
get a lot of type errors. However if you use any-type, your code will
behave the same, and then you can start the migration process gradually.
Though for the omst part, you should just avoid using any-type.
*/

// age2 is a variable that can take on any data-type
let age2: any;
age2 = 30;
age2 = false;

// Title is declared without a type or a value, so it's automatically any-type
let title;
title = 25;
title = {
	hello: "World",
};

// Eleemnts of any type can be in this array
let things2: any[] = ["hello", true, null];
things2.push({
	id: 123,
});

/*
- Function takes 'value', which can be any data-type. Then it 
returns a value of any datatype. 

*/
function addTogether(value: any): any {
	return value + value;
}
const resultOne = addTogether("hello"); // resultOne is any-type data-type
