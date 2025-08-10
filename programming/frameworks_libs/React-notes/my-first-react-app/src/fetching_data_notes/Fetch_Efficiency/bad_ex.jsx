/* eslint-disable react/prop-types */
/*

+ Request waterfalls: When requests have to wait for an earlier request to be finished
  before starting.

- Behavior: This implementation is really slow, and it's because of how we fetch the data.
  This is because we're allowing a request waterfall. Each request here has to wait 
  until an earlier request is finished in order to even start. We touched on this earlier when
  comparing our bad vs ideal example.

  fetch sidebar and wait => fetch issue and wait => fetch comments and wait; all of these are 
  happening sequentially, rather than happening concurrently. 

- Solutions: The solution is to lift the request up.

*/

import { useState, useEffect } from "react"

// Isolate data fetching into a custom hook that returns a the data value, which is a state value.
const useData = (url) => {
	const [state, setState] = useState()
	useEffect(() => {
		const fetchData = async () => {
			const data = await (await fetch(url, { mode: "cors" })).json()
			setState(data)
		}
		fetchData()
	}, [url])
	return { data: state }
}

const Sidebar = ({ data }) => {
	return (
		<div className="sidebar">
			{data.map((link, index) => (
				<li key={index}>{link}</li>
			))}
		</div>
	)
}
/*
1. Use our custom hook, which stores data value here and runs the fetch useEffect when it mounts.
2. Showing loading state when waiting for comments data
3. Render our comments data when done.
*/
const Comments = () => {
	const { data } = useData("/get-comments")
	if (!data) return <p>Loading Comments Data...</p>
	return data.map((comment, index) => <div key={index}>{comment.title}</div>)
}

/*
1. Use our custom hook, allowing us to run an effect on mount that fetches the data for us. 
  Now all we do is just watch interact with the 'data' variable.
2. Show loading screen when Issue data isn't loading
3. Then finally we're able to render our issue data, and render our 'Comments'
  component.
*/
const Issue = () => {
	const { data } = useData("/get-issue")

	if (!data) return <p>Issue Data Loading...</p>

	return (
		<div>
			<h3>{data.title}</h3>
			<p>{data.description}</p>
			<Comments />
		</div>
	)
}

/*
- Finally in our app class, we load data for our sidebar
1. Use our custom hook to fetch sidebar data when App component mounts
2. Showing loading screen when not done getting sidebar data
3. Finally, after we have our sidebar data, render our sidebar and 
  our Issue component.
*/
export default function App() {
	const { data } = useData("/get-sidebar")

	if (!data) return <p>Loading Sidebar Data...</p>
	return (
		<>
			<Sidebar data={data} />
			<Issue />
		</>
	)
}

export { Sidebar, Issue, Comments }
