/*
+ Interfaces: A way to define a custom data 'structure' or data-type that 
other data-structures must follow. 

*/

/*
- Ex. 1: Let's say we have an app that lists blog authors. Each 
author is represented by an object. We'll let's set some rules, well
they probably need names, avatars (a url to a picture), etc. We'll
we can have a custom type for these author objects in our code.

1. Create an 'Author' interface, a custom datatype. 
2. Now we can use it. Akin to how we typed things with 'string' 
or 'number', we can type things with 'Author' now.
3. Now 'authorOne' must be of data-type 'Author' or must follow the 
structure of the 'Author' interface. Just a custom data-type

- NOTE: For interfaces, the convention is PascalCase, where each
word starts with a capital letter.
*/

interface Author {
	name: string;
	avatar: string;
}
const authorOne: Author = {
	name: "John",
	avatar: "https://example.com/avatar.jpg",
};

/*
- Ex. 2: Here we have an interface 'Author' inside our interface Post.
So the 'author' property on this "Post" is of type 'Author' and must
follow the rules of the 'Author' interface.
*/
interface Post {
	title: string;
	body: string;
	tags: string[];
	created_at: Date;
	author: Author;
}

const newPost: Post = {
	title: "Gaming Trend",
	body: "I love gaming",
	tags: ["gaming", "trend"],
	created_at: new Date(),
	// This works since authorOne is of type 'Author' so it meets the
	// rule of how 'author' property on 'Post' must be of type 'Author'
	author: authorOne,
};

const newPost2 = {
	title: "Gaming Stuff",
	body: "I love gaming",
	tags: ["gaming", "trend"],
	created_at: new Date(),
	author: {
		name: "John",
		avatar: "http://some-image.jpeg",
	},
};

/*
- Ex. 3: Using interfaces in functions. Here 'post' is a argument
of data-type "Post". 


- NOTE: The neat thing is that when doing post.title, and accessing
the properties, TypeScript automatically brings up the recommendations
for you because it knows the type of the variable and the info about
the variable.
*/

function createPost(post: Post): void {
	console.log(`Created post: ${post.title} by ${post.author.name}`);
}

/*
- Ex. 4: Using interfaces with arrays. While 'newPost' is explicitly
typed, 'newPost2' works as well. This is because for these complicated
structures, TypeScript doesn't try to infer the type, it sees them as objects.
newPost2 works because it just so happens that its structure conforms with 
the 'Post' interface. So yeah you don't have to explicitly type your 
objects, as long as they conform, it should still work.

*/
let posts: Post[] = [];
posts.push(newPost);
posts.push(newPost2);

/*
- Ex. 5: Read-only and optional properties. Here 'location'
is readonly, meaning you can't reassign the location value.
As well as this the 'capacity; property is optional, so if 
an object follows this interface, it doesn't have to have
a capacity property.

*/
interface Party {
	readonly location: string;
	capacity?: number;
}

/*
- Ex. 6: You can also create an interface for a function.
So with the 'Mathfunc' interface, any function follow this 
interface or custom data type, can only have x and y as 
numerical parameters, and must return a number.
*/

interface Mathfunc {
	(x: number, y: number): number;
}

const addStuff: Mathfunc = (x: number, y: number): number => x + y;
