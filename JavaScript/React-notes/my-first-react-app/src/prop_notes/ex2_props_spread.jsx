/*
Forwarding props with JSX spread syntax: Some components will pass/forward all of their props to their children.
    Writing it all out can feel repetitive, so instead you can use the spread operator to pass all of those props, and maybe use the 
    props object as well. 

- Starter Code:
function ComponentA({ length, width, height}) {
  return (
    <div className="card">
      <ComponentB
        length={length}
        width={width}
        height={height}
      />
    </div>
  );
}

*/

function ComponentB(props) {
	return (
		<h1>
			Length: {props.length}, Width: {props.width}, and height:{" "}
			{props.height}
		</h1>
	)
}

function ComponentA(props) {
	return (
		<div className="card">
			<ComponentB {...props} />
		</div>
	)
}

export default ComponentA
