/* eslint-disable react/prop-types */
/*
+ Dealing with multiple requests in react:




*/

import { useState, useEffect } from "react"

function Bio({ delay }) {
	const [bioText, setBioText] = useState(null)
	useEffect(() => {
		setTimeout(() => {
			fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
				.then((response) => response.json())
				.then(() => setBioText("I like long walks on the beach and JavaScript"))
				.catch((error) => console.error(error))
		}, delay)
	}, [delay])

	return bioText && <p>{bioText}</p>
}

export default function Profile({ delay }) {
	const [imageURL, setImageURL] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
				.then((response) => response.json())
				.then((response) => setImageURL(response[0].url))
				.catch((error) => console.error(error))
		}, delay)
	}, [delay])

	/*
  - Behavior: Bio's request will always be a second later than
  Profile's request. Profile's request has to resolve (imageURL be defined), and only
  then will Bio start being rendered, and its request starts. We want to be 
  able to make it so both requests fire when Profile renders, and we don't want to compromise our design.

  - Solution: Lift our request up. Put the Bio's request up Profile's component, so that both requests happen at 
    same time. 

  */
	return (
		(imageURL && (
			<div>
				<h3>Username</h3>
				<img src={imageURL} alt={"profile"} />
				<Bio delay={1000} />
			</div>
		)) || <h1>Loading...</h1>
	)
}
