/*
- Continuing the PackingList example, in both conditional branches our code returns <li className="item">...</li>. However, 
    when you want to change something like a className, you'd have to do it in both branches. Let's make this more maintainable
    with ternary operators!


- Explanation: If it's packed, we wrap it around 'del' tags, which just put the strike through effect on the element, and 
    we put a check mark. Else we just return the value of name property.



+ Using AND (&&) operator: A common thing is, when you want to render something when true, or nothing otherwise. 

- And syntax below: 
<li className="item">{name} {isPacked && "✔"}</li>

- NOTE: If isPacked, then (&&) return checkmark. This common AND logic syntax means, if left side is true, return
    the value on the right side.

- Pitfall: Don't put numbers on the left side of &&. If left side is 0, whole expression is evaluated to 0, which makes 
	React render 0 rather than rendering nothing.
*/

import PropTypes from "prop-types"

function Item({ name, isPacked }) {
	return (
		<li className="item">{isPacked ? <del>{name + " ✔"}</del> : name}</li>
	)
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
