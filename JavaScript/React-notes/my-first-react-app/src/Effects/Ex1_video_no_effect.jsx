/*
- Example 2: Bad Video player example without an effect

    1. We use a ref to have a reference to the video node

- Why this doesn't work: We can't read the ref values while rendering, and we are 
    violating this rule (trying to change DOM node during rendering). Rendering needs to be pure calculation. Also on
    the first render, ref is null so the <video> doesn't exist yet.
*/
import { useState, useRef } from "react"
import PropTypes from "react"
function VideoPlayer({ src, isPlaying }) {
	const ref = useRef(null)

	if (isPlaying) {
		ref.current.play()
	} else {
		ref.current.pause()
	}
	return <video ref={ref} src={src} />
}
VideoPlayer.propTypes = {
	src: PropTypes.string,
	isPlaying: PropTypes.bool,
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

export default App
