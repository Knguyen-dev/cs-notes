/*
- Props: The information you apss into a JSX tag

- Familiar props: Familiar properties usch as className, src, alt, width, and height, all of which you can pass to an <img> JSX tag. However these 
    props/properties are already defined by ReactDOM. However, you can pass any props to your OWN components.

- In this example, Profile isn't passing any props or properties to the child component within it (Avatar)

*/

function Avatar() {
	return (
		<img
			className="avatar"
			src="https://i.imgur.com/1bX5QH6.jpg"
			alt="Lin Lanying"
			width={100}
			height={100}
		/>
	)
}

function Profile() {
	return <Avatar />
}

export { Avatar, Profile }
