/*
+ Using Libraries:

- React-Independent Libraries: Such as Axios abstract the complexities of fetching with their 
  own request functions. This allows me to replace fetch() with their own functions such
  as axios.get, and still get the same results.

- React-Integrated Libaries: Such as swr, abstract dealing with useCallback, state, and many other 
  React specific things.

*/
import { useState, useEffect } from "react"
import useSWR from "swr"
/*
- Ex.1: Let's show a simple component that needs some initial data, and the difference
  in code of not using a library vs using a library

*/

// Regular React
const Comments = () => {
	const [data, setData] = useState()
	useEffect(() => {
		const dataFetch = async () => {
			const data = await (await fetch("/get-comments")).json()
			setData(data)
		}
		dataFetch()
	}, [])
	return <p>Data: {data}</p>
}
/*
- Using data fetching library swr. Notice how it's very similar 
  to how we used to do it when we created our own custom hooks for 
  fetching data before. We are returned the data, and an error object 
  if things go wrong. Here we pass the endpoint as our first arg, and
  a fetch function for our second arg. 

- Benefits: Underneath the library handles the error states, data states, 
  useEffect, and probably other things that we now don't have to.
*/

const Comments2 = () => {
	const { data, error } = useSWR("/get-comments", async (url) => {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error("Failed to fetch data")
		}
		return response.json()
	})

	if (error) return <p>Error: {error.message}</p>
	if (!data) return <p>Loading...</p>
	return <p>Data: {data}</p>
}

export { Comments2 }

export { Comments }
