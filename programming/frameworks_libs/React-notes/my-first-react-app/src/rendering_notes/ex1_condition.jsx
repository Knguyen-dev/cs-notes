/*
+ Lesson 3: Conditional rendering. Sometimes you want to display different things at different times. In react you can regular JavaScript
    conditional syntax to conditionally render JSX.
+ Previous: prop_notes

- PackingList Example: Given a list of items, for the ones we say we've packed, we display a check mark, else we don't display
    a check mark for it. 
    
- Returning null: However, if you don't want to render anything at all for unpacked stuff, you can return null to return nothing. 
    However this is uncommon. The typical approach would be filtering out the components in the parent component's jsx. 

+ Conditionally assigning/saving JSX to a variable. You can reassign variables defined with let and we can assign those 
	variables with the values of jsx. Look at how we can easily assign JSX to variable 'itemContent'. This is one 
	solution to making our code more maintainable, and its one of the more flexible solutions compared to even ternary or using AND.

-   Credits: https://react.dev/learn/conditional-rendering


*/

import PropTypes from "prop-types"

function Item({ name, isPacked }) {
	/*
	let itemContent = name
	if (isPacked) {
		itemContent = <del>{name + " ✔"}</del>
	}
	return <li className="item">{itemContent}</li>
	 */

	if (isPacked) {
		return <li className="item">{name} ✔</li>
	}
	return <li className="item">{name}</li>
}
Item.propTypes = {
	name: PropTypes.string,
	isPacked: PropTypes.bool,
}

function PackingList() {
	return (
		<section>
			<h1>Sally&apos;s Ride Packing</h1>
			<ul>
				<Item isPacked={true} name="Space suit" />
				<Item isPacked={true} name="Hemlet with a golden leaf" />
				<Item isPacked={false} name="Photo of Tam" />
			</ul>
		</section>
	)
}

export default PackingList
