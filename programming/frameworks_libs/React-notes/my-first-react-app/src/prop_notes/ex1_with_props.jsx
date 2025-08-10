/*
- How to pass props to the child component:

1. Pass props to Avatar. We're going to pass/define two props: person (an object) and size (a number). So 
    define the properties that are being passed to Avatar component when it's being created inside the Profile component.

2. Read/Process props inside the child component. So make Avatar accept the properties that's being passed to it. Usually
    react components accept a single argument a 'props' object. Usually we don't need the entire props object, so we destructure it 
    using the syntax seen below

3. Optional: You can also specify default values for a prop. Now if Avatar component doesn't have a 'size' property specified on creation, 
    it falls back to the integer value of 100. 

    NOTE: Default value only used if 'size' prop is missing or if you do size={undefined}. If size={null} or size={0} the default value won't be used.


*/
import getImageUrl from "./utils"

function Avatar({ person, size = 100 }) {
	return (
		<img
			className="avatar"
			src={getImageUrl(person)}
			alt="Lin Lanying"
			width={size}
			height={size}
		/>
	)
}

function Profile() {
	return (
		<Avatar
			person={{
				name: "Lin Lanying",
				imageId: "1bX5QH6",
			}}
			size={100}
		/>
	)
}

export { Avatar, Profile }
