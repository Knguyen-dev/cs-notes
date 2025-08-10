import React from "react";
export interface Props {
	title: string; // Title is a required string prop
	color?: string; // color is an optional prop
}

/*
- Then use your interface like this
- NOTE: When using TypeScript with React, you're not going to be 
using propTypes, but rather you're just going to be creating interfaces
for your props to abide by.
*/
export default function Header(props: Props) {
	return (
		<header style={{ color: props.color ? props.color : "blue" }}>
			<h1>{props.title}</h1>
		</header>
	);
}
