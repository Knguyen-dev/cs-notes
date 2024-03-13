/*
+ Basic intro:
- Defining a data-type for a parameter. Here
we can define the type of `myStr` as a string.
*/
function reverse(myStr: string) {
	return myStr.split("").reverse().join("");
}

/*
- You can even define custom types. So if we had a MenuItem 
  object and you're passing it into a function, you could add
  a custom type to ensure that other developers know what 
  'menuItemObj' is and what it looks like.
*/
interface MenuItem {
	title: string;
	cost: number;
}

function addToCart(item: MenuItem) {
	return `Added ${item.title} for $${item.cost}`;
}
