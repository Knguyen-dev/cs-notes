import "../styles/App.css"

//
import ArrowIcon from "../assets/arrow.svg?react"
import BellIcon from "../assets/bell.svg?react"
import BoltIcon from "../assets/bolt.svg?react"
import CaretIcon from "../assets/caret.svg?react"
import ChevronIcon from "../assets/chevron.svg?react"
import CogIcon from "../assets/cog.svg?react"
import MessengerIcon from "../assets/messenger.svg?react"
import PlusIcon from "../assets/Plus.svg?react"

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    )
}

function NavItem({ icon }) {
    return (
        <li className="nav-item">
            <a href="#" className="icon-button">
                {icon}
            </a>
        </li>
    )
}

function App() {
    return (
        <>
            <Navbar>
                <NavItem icon={<PlusIcon />}></NavItem>
                <NavItem icon={<BellIcon />}></NavItem>
                <NavItem icon={<MessengerIcon />}></NavItem>
            </Navbar>
        </>
    )
}

export default App
