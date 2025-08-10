/*
- Remember JSX lets us use HTML-like markup in a JavaScript file, allowing for rendering and markup to be in the same place. 
Sometimes we'll want to add some JavaScript logic to our markup to make it dynamic and interactive. To do this, we use 
curly braces in our JSX to open a window to JavaScript.

- Using Curly Braces: JSX makes it possible to put JavaScript code inside curly braces { }. They're like template literals or f-strings 
    so you can literally put an entire JavaScript expression in it. You can only use curly braces two ways inside JSX:
    1. As text directly in a JSX tag: <h1>{name}'s To Do List</h1> works, but <{tag}>Gregorio Y. Zara's To Do List</{tag} doesn't.
    2. As attributes following = sign: src={avatar} reads 'avatar' variable, but src="{avatar}" reads string '{avatar}'

Ex. 1: Passing strings with quotes, to do this, use single or double quotes. However, we 
    can use curly braces to dynamically specify data. Of course the className="avatar" is a string, but
    {avatar} gets its value from the 'avatar' variable.

Ex. 2: This just shows you can also put function calls in the braces, they handle anything javascript.

- Using 'double curlies': You can use JavaScript objects in JSX, it just means you're dealing with two curly braces now since 
    JavaScript objects wrap themselves in curly braces. For CSS inline styles in our react component, we put them in a javascript object as well

Ex. 3: How to use double curlies and inline css in JSX

Pitfall: Inline style properties are written in camelCase, in html 'background-color', but use backgroundColor in our react component


*/

function Example1() {
	const avatar = "https://i.imgur.com/7vQD0fPs.jpg"
	const description = "Gregorio Y. Zara"
	return <img className="avatar" src={avatar} alt={description} />
}

function formatDate(date) {
	return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
}

function Example2() {
	const today = new Date()
	return <h1>Todo List for {formatDate(today)}</h1>
}

function Example3() {
	return (
		<ul
			style={{
				backgroundColor: "black",
				color: "pink",
			}}
		>
			<li>Improve the videophone</li>
			<li>Do something else about the lake</li>
			<li>Work on the alcohol-fuelled engine</li>
		</ul>
	)
}

// Final example
const person = {
	name: "Gregorio Y. Zara",
	theme: {
		backgroundColor: "black",
		color: "pink",
	},
	avatar: "https://i.imgur.com/7vQD0fPs.jpg",
	description: "Gregorio Y. Zara",
}

function TodoList() {
	return (
		<div style={person.theme}>
			<h1>{person.name}&apos; todos</h1>
			<img
				className="avatar"
				src={person.avatar}
				alt={person.description}
			/>
			<ul>
				<li>Improve the videophone</li>
				<li>Do something else about the lake</li>
				<li>Work on the alcohol-fuelled engine</li>
			</ul>
		</div>
	)
}

export { Example1, Example2, Example3, TodoList }
