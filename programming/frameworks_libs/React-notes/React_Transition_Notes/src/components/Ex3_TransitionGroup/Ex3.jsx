import { useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"
import "./Ex3.css"

/*
+ TransitionGroup: When managing a group of items CSSTransition components.
    TransitionGroup automaticallywraps its items in a div, but you can 
    pass a component into 'component' prop to wrap your stuff around it

- Example: Each li item has a button that will set the items state 
        array to an array of items without the one being clicked. Then we have
        a button that adds a todo.

- How to set up:
    1. Create a TransitionGroup component, acts as your container, since you're going to have
        a group of items animated based on states.
    2. Then inside your TransitionGroup, render out your items
        and wrap them in a CSSTransition component. Pass in a 
        key (typical React). 
    3. Then in CSSTransition we put assign 'classNames' the 
        class of the transition that we're going to use in Ex3.css
    

*/

function Example3() {
    const [items, setItems] = useState(() => [
        {
            id: uuidv4(),
            text: "Buy eggs",
        },
        {
            id: uuidv4(),
            text: "Pay bills",
        },
        {
            id: uuidv4(),
            text: "Invite friends over",
        },
        {
            id: uuidv4(),
            text: "Fix the TV",
        },
    ])

    const addItem = () => {
        const text = prompt("Enter some text")
        if (text) {
            setItems((prevItems) => [
                ...prevItems,
                {
                    id: uuidv4(),
                    text: text,
                },
            ])
        }
    }

    return (
        <div className="example-container">
            <TransitionGroup component="ul" className="todo-list">
                {items.map(({ id, text }) => (
                    <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="fade"
                        appear={true}
                    >
                        <li className="todo-item">
                            <button
                                className="remove-btn"
                                onClick={() =>
                                    setItems((items) =>
                                        items.filter((item) => item.id !== id)
                                    )
                                }
                            >
                                &times;
                            </button>
                            <span className="item-text">{text}</span>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <button onClick={addItem}>Add Item</button>
        </div>
    )
}
export default Example3
