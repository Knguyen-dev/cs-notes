/*
+ Fetching Data in React: Our goal is to learn data fetching in react with
  things such as basic api calls, managing states, asynchronous operations. 
  We've already done data fetching before in React with useEffect, and 
  other regular JS projects, so some is review.
*/

import { useEffect, useState } from "react"

/*
- Example 1: 

- Using basic fetch request. Here's an image component that 
  will fetch an image with an effect on its first render.


- Error handling: A common way to handle error handling is to track
  the error with a state value. Then we set error state in our catch 
  block to track whenever an error happens during the fetch.

  NOTE: Status codes such as 400 or anything greater than 400
    aren't considered errors by default, so we consider them
    errors since they didn't get data.

- Loading Value (error handling continued): We can have a state
  to track whether the request for the image is still loading. By doing
  this you can actually have yourself a loading screen.
*/
const Image = () => {
	const [imgURL, setImgURL] = useState(null)
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const requestURL = "https://jsonplaceholder.typicode.com/photos"
		fetch(requestURL, { mode: "cors" })
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Server Error")
				}

				return response.json()
			})
			.then((data) => setImgURL(data[0].url))
			.catch((error) => {
				setError(error)
				console.error(error)
			})
			.finally(() => setIsLoading(false))
	}, [])

	// If the fetch failed, so markup indicating it's an error
	if (error) return <p>A network error happened while fetching content</p>

	// While the fetch is still happening, show loading markup
	if (isLoading) return <p>Loading...</p>

	return (
		<>
			<h1>An Image</h1>
			<img src={imgURL} alt="Placeholder text" />
		</>
	)
}

/*
- Example 2: Using custom hooks when fetching data. A custom hook is just 
  a custom function that uses a react hook. Here our effect runs when
  the component using the custom hook mounts. Then the state values 
  that we have, will update and do their thing in our Image2 component.
*/

const useImgURL = () => {
	const [imgURL, setImgURL] = useState(null)
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const requestURL = "https://jsonplaceholder.typicode.com/photos"
		fetch(requestURL, { mode: "cors" })
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Server Error")
				}

				return response.json()
			})
			.then((data) => setImgURL(data[0].url))
			.catch((error) => {
				setError(error)
				console.error(error)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return { imgURL, error, isLoading }
}

const Image2 = () => {
	const { imgURL, error, isLoading } = useImgURL()

	// If an error happens then load error message
	if (error) return <p>A network error happened while fetching content</p>

	// While the fetch is still happening, show loading markup
	if (isLoading) return <p>Loading...</p>

	return (
		<>
			<h1>An Image</h1>
			<img src={imgURL} alt="" />
		</>
	)
}

export { Image, Image2 }
