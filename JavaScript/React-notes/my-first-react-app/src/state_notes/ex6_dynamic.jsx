/* eslint-disable react/prop-types */
/*

- Here's the accordion 'lifting states up' example, but with 
an array, so there's no hard-coding with the indices involved. So yeah same as the simple example, but we're 
using an array to dynamically set indices


*/

import useState from "react"

function Panel({ title, children, isActive, onShow }) {
	return (
		<section className="panel">
			<h3>{title}</h3>
			{isActive ? (
				<p>{children}</p>
			) : (
				<button onClick={() => onShow(true)}>Show</button>
			)}
		</section>
	)
}

export default function Accordion() {
	const panelData = [
		{
			title: "About",
			content: "With a population of about 2 million...",
		},
		{
			title: "Etymology",
			content: "The name comes from алма, the Kazakh word for...",
		},
		// Add more panel data as needed
	]
	const [activeIndex, setActiveIndex] = useState(0)
	return (
		<>
			<h2>Almaty, Kazakhstan</h2>
			{panelData.map((panelObj, index) => {
				return (
					<Panel
						key={index}
						title={panelObj.title}
						isActive={activeIndex === index}
						onShow={() => setActiveIndex(index)}
					>
						{panelObj.content}
					</Panel>
				)
			})}
		</>
	)
}
