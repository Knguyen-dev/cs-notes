/*
- Solution 1: Using Promise.all() and then saving data to a state. Then 
  passing down data as props. In this solution, we wait for all of the data 
  is obtained before rendering our App
*/
import { useState, useEffect } from "react"
import { Sidebar, Issue } from "./bad_ex"

const useAllData = () => {
	// Set up state values for data we're fetching
	const [sidebar, setSidebar] = useState()
	const [comments, setComments] = useState()
	const [issue, setIssue] = useState()

	/*
  - Promise.all(iterable): Takes an iterable of promises to return an 
    a single promise that resolves into an array of resovled values.

  - fetchData(): Here we start all at the same time, and make sure all of them are done before moving on.
  1. Use promise all so that we can run all 3 requests at same time (in parallel).
    Wait until the promise returned by Promise.all resolves into an array of response 
    objects.
  2. Then for each response object, convert it into a json data, which is another async task.
    So result will now be an array of promises that resolve into json data.
  3. Finally, do await Promise.all(result), as result is now a promise that resolves 
    into an array of json data.
  4. We finally have our data, so we set our state values
  */
	useEffect(() => {
		const fetchData = async () => {
			const result = (
				await Promise.all([
					fetch("/get-sidebar"),
					fetch("/get-issue"),
					fetch("/get-comments"),
				])
			).map((response) => response.json())
			const [sidebarData, issueData, commentsData] = await Promise.all(result)
			setSidebar(sidebarData)
			setComments(issueData)
			setIssue(commentsData)
		}

		fetchData()
	}, [])

	return { sidebar, comments, issue }
}

const App = () => {
	const { sidebar, comments, issue } = useAllData()

	// show loading state while waiting for all the data
	if (!sidebar || !comments || !issue) return "loading"

	return (
		// Then pass your data values as prop
		<>
			<Sidebar data={sidebar} />
			<Issue comments={comments} issue={issue} />
		</>
	)
}

export default App
