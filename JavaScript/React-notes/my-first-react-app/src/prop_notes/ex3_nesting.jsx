/*
Nesting components: You'll definitely deal with a lot of nesting:

1. This is regular html nesting
<div>
  <img />
</div>

2. This is nesting components. Let's apply this idea
<Card>
  <Avatar />
</Card>

- How to nest:
1. Instantiate one inside another component. Like how we created an 
    avatar component inside a Card component.

- Analysis: 
1. Card component is getting prop 'children' when created. 'children' is set to 'Avatar' component, and so 
    it'll be rendered in a wrapper div.
2. In this case, it's very easy to see that component 'Card' is just a div. We can do <Card>More stuff</Card> to 
    render text onto it, or we can do more complex things such as nesting another component into it such as 'Avatar'
    to make it render the jsx markup in the Avatar component. 


NOTE: 'children' prop is mainly used for visual wrappers, such as panels, grids, and other major containers that are 
used for displaying sections of content.
*/

import { Avatar } from "./ex1_with_props"

// Card component
function Card({ children }) {
	return <div className="card">{children}</div>
}

// Profile component
function Profile() {
	return (
		<Card>
			<Avatar
				size={100}
				person={{
					name: "Katsuko Saruhashi",
					imageId: "YfeOqp2",
				}}
			/>
		</Card>
	)
}

export default Profile
