/*
+ Cleaning Up Effects: Some Effects need an option to clean up what they did. For example a ChatRoom component (like the chat screen) 
    only needs to connect to a chat sever when it first pops up on the screen. Assume we have 'createConnection()' API
    that returns object with connect() and disconnect() methods. Let's keep the user connected while the component is displayed.



For Example: A user goes to the chat page, and creates a connection once the ChatRoom loads in. Then they go to the settings page, causing 
        ChatRoom to disappear, but its connection doesn't disappear. These connections could pile up
        if we're not careful. 
    

- Cleaning up steps:
    1. We should only connect to the chat server once ChatRoom component first appears on screen, 
        so have [] as dependency array. It'd be slow if we'd connect on every re-render
    2. Remember during development mode React actually renders a component twice (even if it's the mount/first render), which
        helps us find errors such as in this case where we'd be making 2 connections, when we only want the user to have 1 connection
        at a time.
    3. Before we make a new connection, or run the Effect again, we need to run a cleanup function.
        Do this by returning a function in useEffect that acts as a clean up function.
    4.  React will call the clean up function before Effect runs again, or when the component is unmounted/removed 
        from the DOM.

    


- Output in Development: This is correct behavior for our cleanup function as before we run the Effect again.
    - Remember, cleanup functions should stop/undo whatever the Effect was doing. Users shouldn't be 
    able to see when your Effect ran only once, and running, cleaning up, and running again.
    - Idea is making it so how to make the Effect work after re-rendering
    1. Connecting...
    2. Disconnected!
    3. Connecting...
 */
import { useEffect, useState, useRef } from "react"
function createConnection() {
	return {
		connect() {
			console.log("Connecting...")
		},
		disconnect() {
			console.log("Disconnected!")
		},
	}
}

function ChatRoom() {
	useEffect(() => {
		const connection = createConnection()
		connection.connect()
		return () => {
			connection.disconnect()
		}
	}, [])
	return <h1>Welcome to the chat!</h1>
}

/*
+ Controlling non-react widgets: Sometimes no cleanup is needed. For example, you're 
    adding a map component to the page which has the setZoomLevel() method that you're controlling with a state.
- Example 2: You don't really need clean up. In development, the effect will trigger twice, but
    this isn't really a problem as in this case, zooming the screen to the same value twice wouldn't 
    really make a difference. Of course in production, your effect won't trigger twice/needlessly, 
    but the idea here is "if running the effect after re-renders doesn't break anything, then 
    you probably don't need a clean up function".

useEffect(() => {
    const map = mapRef.current
    map.setZoomLevel(zoomLevel)
}, [zoomLevel])

*/

/*
+ Subscribing/Creating events: If your Effect subscribes to something, the cleanup function should unsubscribe.
- Example 2: Once the component is on screen, we create an event listener. Pass an empty dependency array
    so that the effect won't trigger for subsequent re-renders, which helps ensure there's only one 
    event listener. However, in the case that the component is taken off the DOM, and then 
    placed back onto the DOM, the clean up function makes sure that when the Effect is triggered,
    remove previous event listener that was on the window before adding a new one, to ensure there's only one.


*/

function EventComponent() {
	useEffect(() => {
		function handleScroll(e) {
			const window = e.target
			console.log(window.scrollX, window.scrollY)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])
}

/*
+ Triggering animations: If your Effect causes an animation, the cleanup should reset animation
    to initial state.
- Example 3: Here our 'animation' or Effect triggers only on the first time, and when the component 
    is taken off the DOM, we make sure next time that its effect is triggered, we reset the opacity.
*/
function AnimationComponent() {
	const ref = useRef(null)
	useEffect(() => {
		const node = ref.current
		node.style.opacity = 1
		return () => {
			node.style.opacity = 0
		}
	}, [])
}

/*
+ Fetching Data with effects: If your Effect fetches something, the 
    cleanup should either abort the fetch or ignore the result.

- Example 4: For example, we have a component that fetches data, in this case a user's todos,
    and sets or displays them on screen. We set the Effect so that the component only
    fetches new data, when the userID changes.

    1. Effect will start fetching data, but the cleanup will make sure
        we don't do anything with said data.
    2. Let our FetchComponent be a div that shows our todos. Once that 
        is on screen, we start fetching for the todos, which may take a while.
        
        - If the component is taken off of the DOM, like clicking off, React sees
        the component is unmounted from DOM so it runs cleanup, which will set the boolean
        to true in useEffect's block.
        
        - Also, if component is re-rendered with a different userID, due to our dependency array,
        it will trigger the effect again, which will call the cleanup function.

*/
function FetchComponent({ userID }) {
	function fetchTodos(userID) {
		setTimeout(() => {
			console.log("Fetch Complete for UserID: " + userID)
		}, 3000)
	}

	function setTodos(jsonData) {
		console.log("Set the todos for data: " + jsonData)
	}

	useEffect(() => {
		let isIgnore = false
		async function startFetch() {
			const jsonData = await fetchTodos(userID)
			if (!isIgnore) {
				setTodos(jsonData)
			}
		}
		startFetch()
		return () => {
			isIgnore = true
		}
	}, [userID])
}

/*
- Extra example: Now switching the person will re-trigger the effect, and so the previous effect's 
	isIgnored will be set to true. This is helpful as if we switch before the previous fetchBio is done, the boolean 
	and conditional will safely ignore the data and operation of setting the bio.


*/

function Page() {
	const [person, setPerson] = useState("Alice")
	const [bio, setBio] = useState(null)

	useEffect(() => {
		let isIgnored = false
		setBio(null)
		// eslint-disable-next-line no-undef
		fetchBio(person).then((result) => {
			if (!isIgnored) {
				setBio(result)
			}
		})

		return () => {
			isIgnored = true
		}
	}, [person])

	return (
		<>
			<select
				value={person}
				onChange={(e) => {
					setPerson(e.target.value)
				}}
			>
				<option value="Alice">Alice</option>
				<option value="Bob">Bob</option>
				<option value="Taylor">Taylor</option>
			</select>
			<hr />
			<p>
				<i>{bio ?? "Loading..."}</i>
			</p>
		</>
	)
}

/*
+ Sending data: This Effect sends a url on page visit.

- Example 6: In development it'll be called twice, but the reason we don't have any clean up function for this due to a practical perspective.
	There is no user-visible behavioral difference between running once nad running it twice. And during 
	production it's going to only run once anyways.

useEffect(() => {
	logVisit(url)
}, [url])

*/

export { ChatRoom, EventComponent, AnimationComponent, Page, FetchComponent }
