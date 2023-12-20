/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/*
- Lifting request up can cause prop drilling, as you're probably going to pass fetched data 
  as props through many layers in bigger apps. You can use context to create a 'DataProvider'
  which isolates all of your data related handling in it.

- As a result, we can simply just use our 'useComments' hook to simply
  access the data and render the app how we want. 

*/
import { createContext, useState, useEffect, useContext } from "react"
const DataContext = createContext()

export const useComments = () => useContext(DataContext)

export const CommentsDataProvider = ({ children }) => {
	const [comments, setComments] = useState()

	useEffect(() => {
		const fetchData = async () => {
			fetch("/get-comments")
				.then((response) => response.json())
				.then((data) => setComments(data))
		}
		fetchData()
	}, [])

	return (
		<DataContext.Provider value={comments}>{children}</DataContext.Provider>
	)
}
