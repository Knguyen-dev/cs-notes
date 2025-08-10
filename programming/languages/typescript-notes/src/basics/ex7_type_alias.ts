/*
+ Type Alias: Similar to interfaces, they're just another way to define 
a custom data-type for your variables to adhere to. However there are 
some minor differences. While with interfaces, you'll mainly use those
to define the 'structure' of an object, you can use type alias to 
define the datatype of simpler variables. We'll see that in the next
lesson though with 'type Id'.
*/

/*
- Ex. 1:
1. Define a type alias 'Rgb' that will be a tuple of three numbers.

- NOTE: 
1. Essentially the main differences is that you use the equal
sign when making type aliases, but they basically work the same way
as interfaces.

2. This is also an example of a tuple. So a tuple of 3 numbers.
*/
type Rgb = [number, number, number];

function getRandomColor(): Rgb {
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);

	// Return a tuple of 3 numbers, matches 'Rgb' type alias we defined.
	return [r, g, b];
}

// Inferred as 'Rgb' because we returned Rgb data-type.
const colorOne = getRandomColor();

/*
- Ex. 2: An enum basically let's you define 'enumerated' constants.
You wondon't have to start a 0, you could do Up=1, and then the 
rest of them would be 2, 3, and 4.
*/
enum Direction1 {
	Up, // Direction1.Up is 0
	Down, // Direction1.Down is 1
	Left, // etc... 2
	Right, // 3
}
enum Direction2 {
	Up = "Up",
	Down = "Down",
	Left = "Left",
	Right = "Right",
}

/*
- Ex. 3: Creating a type alias that defines an object literal
*/

type User = {
	name: string;
	score: number;
};

const userOne: User = {
	name: "Mario",
	score: 75,
};

function formatUser(user: User): void {
	console.log(`${user.name} has score ${user.score}`);
}

formatUser(userOne);
formatUser({
	name: "Yoshi",
	score: 100,
});
