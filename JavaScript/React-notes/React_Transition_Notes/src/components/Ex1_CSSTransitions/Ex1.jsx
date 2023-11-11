/*

- Example 1:
- How to set up:
    1. Import CSSTransition component from react-transition-group
    2. Then wrap CSSTransition around the markup or component 
        that you want to animate.
    3. CSSTransition takes 3 properties:
        1. state (enter/exit) indicating whether the transition is animating
            the component entering the DOM or exiting from the DOM.
            This is called "in", which accepts a boolean, if true it's 
            in enter state, else in exit state.
        2. duration: how long our transition should take
        3. class name prefixes

- Behavior:
    1. When changing the state of the CSSTransition component to 'enter' or 'in={true}', 
        we see the paragraph tag get two classes: 'myclass-enter' and 'myclass-enter-active'. 
        Then after a duration we get 'myclass-enter-done'
    2. When changing the state to 'exit', we see 'myclass-exit' and 'myclass-exit-active', then 
        finally 'myclass-exit-done'
    3. So all classes assigned from CSSTransition component are prefixed with 'myclass' the 
        class name we passed into the component.

+ Transition process:
    + Enter state:
    1. Enter transition starts:
        - 'myclass-enter' is assigned, and right after 'myclass-enter-active' is assigned.
    2. Enter transition ends after some duration, and removes the aforementioned two 
        class names and replaces it with 'myclass-enter-done'
    + Exit State:
    1. Exit transition starts so 'myclass-exit' and 'myclass-exit-active' assigned
    2. Exit transition ends after duration so replace those two with 'myclass-exit-done'


+ Now let's start making transitions:
    1. Head to "example-a.css"

+ Finally: You can animate the "mounting" of the component. So before we only add transitions for toggling the transitions 
    for the act of the component 'entering' or 'exiting' the DOM. However, we when reload our page, there is no animation for when the paragraph tag
    first mounts the DOM or first appears. This is where "appear" comes in.

- How to set up appear:
    1. Pass true to 'appear' prop
    2. Set the css selectors in your css file.
    3. Now finally, when reloading the page, your elements will start the transition 
        for the 'enter' state.
    
    NOTE: The animation/transition for appear should be 
        the same thing that you're using for 'enter'.


- Summary: Using react-transition-group we can create transitions for when 
    components appear or disappear. We should note that these are just transitions, 
    and that even when the paragraph tag has 'exited' it's still on the DOM. 
    In the next example, we go more in depth about CSSTransition, mainly
    some more properties and things that can be used.

+ Credit: https://youtu.be/sfZZA8n07FA?feature=shared
*/
import { CSSTransition } from "react-transition-group"
import { useState } from "react"
import "./Ex1.css"

function Example1() {
    const [isEnter, setIsEnter] = useState(true)

    return (
        <div className="example-container">
            <button onClick={() => setIsEnter((state) => !state)}>
                Transition
            </button>

            <CSSTransition
                in={isEnter}
                timeout={1000}
                appear={true}
                classNames="myclass"
            >
                <p className="my-paragraph">{isEnter ? "Enter" : "Exit"}</p>
            </CSSTransition>
        </div>
    )
}

export default Example1
