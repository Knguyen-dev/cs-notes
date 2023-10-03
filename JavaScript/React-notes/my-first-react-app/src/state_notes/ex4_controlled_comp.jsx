/*
+ Controlled Components: There are many native HTML elements that maintain and control their own 
    internal states. Like the input element and how it updates its own value onchange. There 
    can be many times where you want to control the value of the input element, and this is the 
    idea of a controlled component




*/

import { useState } from "react"

/*
- Example 1: Here we create a controlled component, as we're controlling the state of 
    the input value for the input element. To ensure it updates the input displayed, we 
    create an event listener with setValue, and we set the value of the input to the state's value. 
    Now everytime the input changes, it will call to re-render the component and update it.

*/
function CustomInput() {
	const [value, setValue] = useState("")
	return (
		<input
			type="text"
			value={value}
			onChange={(event) => setValue(event.target.value)}
		/>
	)
}

export default CustomInput
