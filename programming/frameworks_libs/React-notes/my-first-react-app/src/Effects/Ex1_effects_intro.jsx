/* eslint-disable react/prop-types */
/*
+ Credits: 
    1. https://react.dev/learn/synchronizing-with-effects
    2. https://www.theodinproject.com/lessons/node-path-react-new-how-to-deal-with-side-effects

+ How to deal with side effects:

+ Effects: Some components  will interact with things outside of themselves.
    This could be querying/sending data to a server, changing the position of a component on the webpage, etc.
    These interactions with the outside world are called side effects. Event handlers 
    contain "side effects" (changes in program's state) caused by a user's actions (for example, clicking a button).

    - Event handlers aren't enough sometimes. For example, a ChatRoom component that must connect to a server 
        when it's being displayed. Connecting to a server is a side effect (we are interacting with the outside world), 
        so it isn't going to happen during rendering because it's not a pure calculation (async). Instead, effects let's us specify side effects that 
        need to happen when we are rendering, rather than waiting for an event. Sending a message in chat is an event since it's 
        caused by a user pressing the send button. While setting up a server connection is an effect since it 
        should just happen when the chat room is created.
    - NOTE: Effects run at the end of a "commit", so after we place stuff on the DOM.

+ Effects may not be necessary: Effects are typically used to synchronize your React code with 
    some external system such as browser APIs, third-party stuff, etc. If your effect only changes a state based on other state
    then we probably won't need it.

+ How to write an Effect:
    1. Declare it: By default the Effect will run after every component render
    2. Specify dependencies: Typically Effects should only re-run when needed, rather than after every re-render.
        For example, a fade-in animation should only run when the component appears, not everytime the component
            updates or changes for some reason.
    3. Add cleanup if needed: Some Effects need to know how to stop, undo, cleanup whatever it was doing.
        For example, a 'subscribe' button needs an 'unsubscribe button'. A 'connect' needs a 'disconnect'
        button. A 'download' needs a 'cancel' button. All of these side effects, should have an option
        to reverse or cleanup whatever it does.



- Pitfall: By default Effects run after every render, so be careful of infinite loops.
*/

import { useEffect, useRef, useState } from "react"
/*
- Example 1: We create a component with a simple effect. Remember the effect will
    only run after the component has been committed to the DOM, so in a sense useEffect 'delays' code 
    from running until render is on screen.
*/
function MyComponent() {
	useEffect(() => {
		// Code here will run after every render
	})

	return <div />
}

/*
- Example 2: Use an Effect to synchronize with an external system. Let's control our VideoPlayer component, 
    to control whether the browser built-in <video> tag is playing. 

    - This works because, remember, React Effects are executed after the component
        has been committed to the DOM. So at that point, ref.current 
        will point to the video tag. By using an Effect, we make 
        rendering a pure calculation, and so using ref is only done outside of the rendering 
        process.

- Summary: In this example, we synchronized our React state with an external system (browser media API).

- NOTE: This example is very simplified and incomplete, as controlling a video player is a lot
    more complex. Calling play() may fail, user may play/pause using browser controls, etc.
    
*/

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null)

	useEffect(() => {
		if (isPlaying) {
			ref.current.play()
		} else {
			ref.current.pause()
		}
	})
	return <video ref={ref} src={src} loop playsInline />
}

function App() {
	const [isPlaying, setIsPlaying] = useState(false)
	const videoSrc =
		"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"

	return (
		<>
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? "Pause" : "Play"}
			</button>
			<VideoPlayer isPlaying={isPlaying} src={videoSrc} />
		</>
	)
}

/*
- Example 3: Careful of Infinite loops when using effects. Everytime after 
    it renders, the Effect executes and updates the state, which causes another render,
    which the effect to run again, and so on and so forth.
*/
function InfiniteComponent() {
	const [count, setCount] = useState(0)
	useEffect(() => {
		setCount(count + 1)
	})
}

export { MyComponent, InfiniteComponent, App }
