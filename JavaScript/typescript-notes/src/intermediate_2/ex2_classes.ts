/*
- Ex.1: You can define an interface with a class.

+ Access/data modifiers:
- You can make class properties public, protected, or private.
By default they are public.

+ How to use interface on a class:
1. Define your interface.
2. Then do MyClass implements MyInterface
- Takeaway: Yeah and you can just plan out what your classes will look
like and it just makes you code more robust and documented.

- NOTE: 
1. Remember the constructor runs everytime a new object is initialized.
Just a little review of classes. Private makes it so you can only
access the property in the class definition. While protected means
you can only access it within the current class and 'inherited' classes.


*/

interface PersonInterface {
	id: number;
	name: string;
	register(): string;
}

class Person implements PersonInterface {
	id: number;
	name: string;
	// private somePrivateProperty

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	register() {
		return `${this.name} is registered!`;
	}
}
const brad = new Person(1, "Brad");

/*
- Ex. 2: Let's create an employee class that will inherit
    the properties and methods of the Person class.
1. Instead of doing 'this.name' and 'this.id' we can just
    do 'super' and pass in the appropriate arguments to 
    the parent constructor.
2. Now you have an Employee, and of course you can just the 
    'register' method since it's public and passed down to this
    Employee sub-class.
    
*/

class Employee extends Person {
	position: string;

	constructor(id: number, name: string, position: string) {
		super(id, name);
		this.position = position;
	}
}
const dave = new Employee(3, "Shawn", "Developer");
