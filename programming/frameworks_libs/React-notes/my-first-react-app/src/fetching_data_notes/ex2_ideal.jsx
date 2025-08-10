/* eslint-disable react/prop-types */
/*
- Example: Handling multiple requests effectively by lifting requests up


*/

import { useEffect, useState } from "react"

function Bio({ bioText }) {
	return <p>{bioText}</p>
}

export default function Profile() {
	const [imageURL, setImageURL] = useState(null)
	const [bioText, setBioText] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
			.then((response) => {
				if (!response.ok) {
					throw new Error("Server Error getting Image")
				}
				return response.json()
			})
			.then((response) => {
				setImageURL(response[0].url)
				return fetch("https://jsonplaceholder.typicode.com/posts/1") // Example secondary fetch for bio
			})
			.then((bioResponse) => {
				if (!bioResponse.ok) {
					throw new Error("Server Error getting Bio")
				}
				return bioResponse.json()
			})
			.then((bioData) => setBioText(bioData.body))
			.catch((error) => {
				setError(error)
				console.error(error)
			})
	}, [])

	/*
  1. If there's been an error getting the image or bio, then render an error
  2. Have conditional rendering for image, so that while it isn't complete we   
    have a loading screen.
  3. However, at the same time, we have the same conditional for bio. By structuring 
    it this way, the two requests aren't relying on the other to load.
  */

	if (error) return <p>Network Error: {error}</p>

	return (
		<div>
			<div>
				<h3>Username</h3>

				{imageURL ? (
					<img src={imageURL} alt={"profile"} />
				) : (
					<p>Loading Image...</p>
				)}
				{bioText ? <Bio bioText={bioText} /> : <p>Loading bio...</p>}
			</div>
			<h1>Loading...</h1>
		</div>
	)
}
