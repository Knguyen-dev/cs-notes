/* eslint-disable react/prop-types */
import "../styles/App.css"
import { useState } from "react"
import { DropDownMenu } from "./DropDownMenu"

// import ArrowIcon from "../assets/arrow.svg?react"
import BellIcon from "../assets/bell.svg?react"
// import BoltIcon from "../assets/bolt.svg?react"
import CaretIcon from "../assets/caret.svg?react"
import MessengerIcon from "../assets/messenger.svg?react"
import PlusIcon from "../assets/Plus.svg?react"

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    )
}

/*
- Given a state to determine when it's going to open its drop down. 
    Obviously not all of them have a dropdown.

NOTE: Actually very common to nest SVGs inside anchor tags, even if they lead to nowhere.
    A common technique as placing an SVG inside an anchor tag to make a clickable icon. 

*/
function NavItem(props) {
    const [open, setOpen] = useState(false)
    return (
        <li className="nav-item">
            <a
                href="#"
                className="icon-button"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
                {props.icon}
            </a>

            {open && props.children}
        </li>
    )
}

function App() {
    /*
    - The reason some of our icon components aren't being 
        passed as direct children to 'NavItem', but rather props is because 
        some icons will have a menu drop down to show more stuff
        and others won't. For the dropdown, we will show 
        the direct children of the NavItem using a 'state'.
    */

    return (
        <>
            <Navbar>
                <NavItem icon={<PlusIcon />}></NavItem>
                <NavItem icon={<BellIcon />}></NavItem>
                <NavItem icon={<MessengerIcon />}></NavItem>

                <NavItem icon={<CaretIcon />}>
                    <DropDownMenu />
                </NavItem>
            </Navbar>
        </>
    )
}

export default App
