/* eslint-disable react/prop-types */
/*

+ Specify Effect Dependencies: Often you don't want effects to run after every render. For
    example, in a ChatRoom component, you don't want to reconnect to the chat server on every
    keystroke that a user is doing when writing a message.


Pitfalls: What dependency array set ups mean
1. Effect runs after every render
useEffect(() => {
    # Some Code
});

2. Effect will only run on the first render, and not for following re-renders 
useEffect(() => {
    # Some Code
}, []);

3. Effect runs on first render, and if either a or b have changed since the previous render.
useEffect(() => {
    # Some Code
}, [a, b]);



/*


/*
- Continuing the VideoPlayer example, let's specify some dependencies for the Effect that component uses.
    
1. Pass an array in useEffect(callback, dependencyArr). First pass an empty array
2. You'll see "React Hook useEffect has a missing dependency: 'isPlaying'". The code in 
    your Effect depends/relies on the value of the isPlaying variable. So to fix
    this, explicitly add 'isPlaying' to your 'array of dependencies' for the Effect.

3. Now React knows when to run or skip the code in your Effect after a render. Now
    if 'isPlaying' is the same as it was for the previous render, it will skip running the effect.

- Summary: Before, calling setText would re-render the App, and then the video-player and unnecessarily
    run the Effect. However, by using a dependency array to that effect, now VideoPlayer's effect only
    runs when the values in that dependency array have changed from the previous render. So now 
    when setText is called and parent re-renders due to it, VideoPlayer's effect won't 
    run unnecessarily and it won't re-render needlessly either.

- NOTE: VideoPlayer didn't have a change in state or props when setText is called, which 
    means typically React shouldn't re-render it to be efficient. HOWEVER, if a component has 
    an Effect without a dependency array, then that Effect will be scheduled to run 
    after every render. As a result, the component that Effect is on (VideoPlayer) will need to 
    be scheduled for a re-render as well, even if it's states or props didn't change.

- NOTE 2: The reason why 'ref' isn't included as an Effect dependency is because React 
    guarantees that it's a "stable identity". Basically React guarantees that it will always
    going to be an object with a 'current' property, always the same javascript object.
    Since it doesn't change, it doesn't need to be added as a dependency.

*/

import { useState, useRef, useEffect } from "react"

function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null)
	useEffect(() => {
		if (isPlaying) {
			ref.current.play()
		} else {
			ref.current.pause()
		}
	}, [isPlaying])
	return <video ref={ref} src={src} loop playsInline />
}

export default function App() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [text, setText] = useState("")

	return (
		<>
			<input value={text} onChange={(e) => setText(e.target.value)} />
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? "Pause" : "Play"}
			</button>
			<VideoPlayer
				isPlaying={isPlaying}
				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			/>
		</>
	)
}
