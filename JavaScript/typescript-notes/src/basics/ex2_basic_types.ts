/*
+ Type inference: Typescript automatically tries to infer the 
    datatype of a variable if you don't explicitly define it.
    In the beginning you'll probably want to practice explicitly
    defining the data-types of everything, but as you grow more 
    experience you'll probably end up not explicitly defining 
    the more simple ones. Like the age variable below, you can 
    definitely define it, but it's pretty obvious to you and other
    developers that it's going to be a number. However sometthing
    like "ComplexMenuItem", it's most likley not overtly obvious
    what kind of datatype it is or will contain. So you'll that's 
    definitely something we'd always explicitly define a type for.

*/

// Define age variable as a number
let age: number = 25;
let firstName: string = "Mario";
let isFictional: boolean; // isFictional is a boolean but we haven't initialized it yet
firstName = "Luigi";
isFictional = true;

/*
- Ex. 2: Here Typescript automatically infers the types of 
    planet, moons, and isLarge as string, number, and booelan. 
    So if we violate those rules, Typescript will give us an error/warning.
*/
let planet = "Earth";
let moons = 1;
let isLarge = false;

/*
- Ex. 3: Null and undefined. When we give something 
a value of null it's kind of intentional like 'a = null'. 
However if we give something the value of 'undefined' that's 
unintentional in the sense that we do "const a;" and don't initialize it.

- Now 'something' can only have the value null. So here the only workaround
is that we can do something = null.

*/
let something: null;
let anotherThing: undefined;

something = null;
anotherThing = undefined;
