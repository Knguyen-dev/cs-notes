import { useState } from "react"
const App = () => {
	const [heading, setHeading] = useState("Magnificent Monkeys!")

	const clickHandler = () => {
		setHeading("Radical Rhinos")
	}

	return (
		<>
			<button type="button" onClick={clickHandler}>
				Change Text
			</button>
			<h1>{heading}</h1>
		</>
	)
}

export { App }
