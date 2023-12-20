import { useState, useEffect } from "react"
import { Sidebar, Issue } from "./bad_ex"

const useAllData = () => {
	// Set up state values for data we're fetching
	const [sidebar, setSidebar] = useState()
	const [comments, setComments] = useState()
	const [issue, setIssue] = useState()

	useEffect(() => {
		/*
    - Solution 2: Parallel promises, where we fire multiple requests at the same time, but 
      but for them independently, in the sense that we can render one even if the others 
      aren't done yet. For scenarios such as we don't want to wait for comments to 
      finish loading before loading our sidebar.

    1. We can do this using normal promise syntax. Here we are literally just 
      scheduling these fetch requests. JavaScript won't wait until one is finished
      before starting the next, it just starts all three essentially at the same time and 
      we aren't waiting for all three to finish before moving on.
    */
		const parallelPromises = () => {
			fetch("/get-sidebar")
				.then((response) => response.json())
				.then((data) => setSidebar(data))
			fetch("/get-comments")
				.then((response) => response.json())
				.then((data) => setComments(data))
			fetch("/get-issue")
				.then((response) => response.json())
				.then((data) => setIssue(data))
		}

		parallelPromises()
	}, [])

	return { sidebar, comments, issue }
}

const App = () => {
	const { sidebar, comments, issue } = useAllData()
	/*
  1. Shows loading state when waiting for sidebar, so we to have sidebar data before doing anything.
  2. Then once sidebar renders, we can show whether we're still loading data for issues

  Summary: Sidebar rendered as soon as sidebar data is available, then Issue and 
    comment may or may not be still waiting on their data.
  */
	if (!sidebar) return <p>Loading...</p>

	return (
		<>
			<Sidebar data={sidebar} />
			{issue ? (
				<Issue comments={comments} issue={issue} />
			) : (
				"Loading issue data."
			)}
		</>
	)
}

export default App
