import { useState } from "react"
import { CSSTransition } from "react-transition-group"
import "./Ex2.css"

/*
- Example 2: Using CSSTransition, let's animate a button that pops up a an alert window, and that 
    alert window can close as well. Let's also say 
    the button shouldn't be on the screen at the same time

    1. We have two CSSTransition here because 2 sections are going
        to be different entering and exit transitions. One 
        for displaying and hiding the button, the other for doing the same 
        for the alert section
    2. By using 'unmountOnExit', when 'exit-done' is added, the component 
        is actually removed from the DOM. Before we were just hiding it for the 
        sake to pretend like 'exiting', but here it's actually removed from the DOM.
    3. Then some new props 'onEnter', means when 'myclass-enter' is 
        put on, it executes code in callback. Then 'onExited' runs 
        code when the child component has 'exit-done' class put. 


+ New things:
1. unmountOnExit: Will remove item from DOM when class 'exit-done' is put on
2. onEnter: Callback fired when 'enter' or 'appear' class is applied
3. onEntering: Callback Fired when 'enter-active' or 'appear-active' is applied
4. onEntered: Callback fired when 'enter-done' or 'appear-done' is placed
5. onExit: Callback fired when 'exit' class is applied
6. onEntering: Callback Fired when 'exit-active' is applied
7. onEntered: Callback fired when 'exit-done' is placed



- Summary: Button shows the message. When message enters, it 
    changes a state to hide the 'show message' button. Then when we close the 
    message, once it has exited, we change a state to show the 
    'show message' button again.

+ Credit: https://reactcommunity.org/react-transition-group/css-transition
*/
function Example2() {
    const [showBtn, setShowBtn] = useState(true)
    const [showMessage, setShowMessage] = useState(false)

    return (
        <div className="example-container">
            {/* We have our button that shows the message 'classNames' could basically be the classname for your transition*/}
            <CSSTransition
                in={showBtn}
                timeout={1000}
                unmountOnExit
                classNames="alertBtn"
            >
                <button onClick={() => setShowMessage(true)}>
                    Show Message
                </button>
            </CSSTransition>

            {/* The alert message itself with button that closes the message */}
            <CSSTransition
                in={showMessage}
                timeout={1000}
                classNames="alert-container"
                unmountOnExit
                onEnter={() => setShowBtn(false)}
                onExited={() => setShowBtn(true)}
            >
                <div className="alert-container">
                    <p className="alert-paragraph">This is an alert!</p>
                    <button onClick={() => setShowMessage(false)}>Close</button>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Example2
