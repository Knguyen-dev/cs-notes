/* eslint-disable react/prop-types */
/*


Example 1: Here panels are independent, as pressing one will not affect the other. This is where
    all panels have their own individual state variables, which is different from our 'lifting state up' 
    approach, which is shown in the 'sharing_states' file.

*/

import useState from "react"

function Panel({ title, children }) {
	const [isActive, setIsActive] = useState(false)

	return (
		<section className="panel">
			<h3>{title}</h3>
			{isActive ? (
				<p>{children}</p>
			) : (
				<button onClick={() => setIsActive(true)}>Show</button>
			)}
		</section>
	)
}

export default function Accordion() {
	return (
		<>
			<h2>Almaty, Kazahkstan</h2>
			<Panel title="About">
				With a population of about 2 million, Almaty is Kazakhstan&apos;s
				largest city. From 1929 to 1997, it was its capital city.
			</Panel>
			<Panel title="Etymology">
				The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
				&quot;apple&quot; and is often translated as &quot;full of apples&quot;.
				In fact, the region surrounding Almaty is thought to be the ancestral
				home of the apple, and the wild <i lang="la">Malus sieversii</i> is
				considered a likely candidate for the ancestor of the modern domestic
				apple.
			</Panel>
		</>
	)
}
