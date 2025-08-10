/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/*
+ Fetching before React: Basically don't do this. The 
  promise from our fetch escapes the 'React Lifecycle'.
  
1. Fetch is fired as soon as JS loads, before
  our useEffect can even be called. 
2. Code will continue and promise just sits there before someone resolves it.
3. Sounds good, but we need to think about Browser limitations. Fetches like 
  this aren't controlled, and could take away time for controlled requests 
  to run. And it's going to be hard to debug how a component that 
  isn't doing anything is slowing down the app.
*/

const commentsPromise = fetch("/get-comments")

const Comments = () => {
	const [data, setData] = useState()
	useEffect(() => {
		const dataFetch = async () => {
			// just await the variable here
			const data = await (await commentsPromise).json()

			setState(data)
		}

		dataFetch()
	}, [url])
}
export default Comment
