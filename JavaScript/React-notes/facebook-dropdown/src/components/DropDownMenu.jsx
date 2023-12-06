/* eslint-disable react/prop-types */
import "../styles/DropDownMenu.css"
import ChevronIcon from "../assets/chevron.svg?react"
import ArrowIcon from "../assets/arrow.svg?react"

import CogIcon from "../assets/cog.svg?react"
import { CSSTransition } from "react-transition-group"
import { useState, useRef, useEffect } from "react"
/*

*/

/*
+ DropDownMenu
1. We'll do unmountonExit so the related components are actually
    removed from the DOM when CSSTransition does the exiting process, 
    rather than just leaving them there. With this we probably don't have to do any rendering logic.

2. Also right now we're only animating the content, not the .drop-down
    itself.


3. Now add a drop-down item

+ DropDownItem
- A basic dropdown item will take text as a child. Then
    we make it customizable by letting devs choose if they
    want their icons on the left, right, or both. If 
    you only pass the 'leftIcon', then only the left will
    render.

4. For the onclick, we look for a 'goToMenu' prop being passed 
    to DropDownItem. Check if this prop was passed, and if it is, 
    set the state to the corresponding menu. By passing it 
    as a prop, it's optional, so not all drop down items will redirect
    you to a new menu. 


5. Now one more thing. If we had a menu with like 9 items, when 
    we transition into it, the height of the drop-down immediately snaps 
    in place. We want to make it smooth so let's fix that. 
    We'll fix this by keeping track of the height of the menu
    that's currently active.


6. We'll use an effect. Since we are interacting wtih DOM in react, using 
    refs is a standard practice. Then we used Effects for side effects, and 
    interacting with the DOM is a common side effects, and refs. If 
    you didn't know, interacting with DOM is not a 'pure calculation' but actually async so 
    that's why its a side effect.

7. Within this effect, we get the active node 
    for the menu, adjust the state's height so it re-renders with the right state.


+ Summary: We learned how to make a drop down menu. And you
    can most definitely modify some of these components 
    in later projects as well.


*/
function DropDownMenu() {
    const [activeMenu, setActiveMenu] = useState("main")
    const [menuHeight, setMenuHeight] = useState(null)
    const mainMenuRef = useRef(null)
    const settingsMenuRef = useRef(null)

    // Change the height to correspond to the height of the current menu
    useEffect(() => {
        if (activeMenu === "main") {
            setMenuHeight(mainMenuRef.current.offsetHeight)
        } else if (activeMenu === "settings") {
            setMenuHeight(settingsMenuRef.current.offsetHeight)
        }
    }, [activeMenu])

    // Drop down item component
    function DropDownItem(props) {
        return (
            <a
                href="#"
                className="menu-item"
                onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
            >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className="drop-down" style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
            >
                <div className="menu" ref={mainMenuRef}>
                    <DropDownItem>My Profile</DropDownItem>
                    <DropDownItem
                        leftIcon={<CogIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu={"settings"}
                    >
                        Settings & Privacy
                    </DropDownItem>
                </div>
            </CSSTransition>

            {/* The settings menu */}
            <CSSTransition
                in={activeMenu === "settings"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
            >
                <div className="menu" ref={settingsMenuRef}>
                    <DropDownItem
                        leftIcon={<ArrowIcon />}
                        goToMenu="main"
                    ></DropDownItem>
                    <DropDownItem>Account Settings</DropDownItem>
                    <DropDownItem>Theme</DropDownItem>
                    <DropDownItem>Security</DropDownItem>
                    <DropDownItem>Advertising Info</DropDownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

export { DropDownMenu }
