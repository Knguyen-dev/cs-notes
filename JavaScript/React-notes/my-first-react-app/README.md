# React + Vite

# React Components

-   React Components are reusable chunks of the UI. Could be things such as Navbar for your navigation bar. Your MainArticle which will be a component that renders your main contnet. Or your App, which represents your main application, and will be the parent of all other components.

*   How to create components

-   function components: Just javascript functions. Make one in "Greeting.jsx", which is a functional component that returns jsx. NOTE: React components must be capitalized or they won't work as expected, so here we capitalized the function Greeting() because it's now a react component. Then you can literally use it like it's html and insert it in. Remember at the core of your components is just markup, so viewing them as special packages of markup makes sense

# What is JSX

-   JSX is a syntax extension for JavaScript that lets you write HTML-like markup in a javascript file. Note that you aren't required to use JSX when writing React components, but doing so makes stuff more simple and its usually the way to go. It's basically an alternative to React's 'createElement' function, which creates a React element, and essentially a react element is just an object. Remember JSX and react are two separate things and can be used separated, if you really wanted to.

*   Why use JSX

-   Usually with apps, our rendering logic and our markup work closely together, but they're for separated into different files due to separation of concerns. JSX allows react to put rendering logic and its content in the same place (a component), which is React's own way of separation of concerns. For example keeping a button's rendering logic and markup together ensures they're in-sync, and details that are unrelated such as the sidebar's markup/functionality is isolated, so it's safe to modify one without affecting the other. It's more intuitive and visual to work this way, and you get better error/warning messages from React.

# Passing Props to a Component

-   React components use props to communicate. Parent components cna pass information to its child components by giving them 'props'. Inside props, we can pass any information such as HTML attributes, or JavaScript value such as objects, arrays, functions, etc. Props can reflect a component's data at any point in time, as there are times that a component may receive different props over time. Just keep in mind that props aren't always static. However,
    it should be noted that props are immutable, so if a component is going to change it's props, then new props must be given by the parent to replace the
    old ones.

-   credits: https://react.dev/learn/passing-props-to-a-component

*   PropTypes:

1. 'npm install --save-dev prop-types"; to install prop-types

-   Credit: https://www.youtube.com/watch?v=cx0S8JyiVxc

# How to render multiple elements or conditionally render elements in JSX

-   Credits:
    1. Conditional Rendering: https://react.dev/learn/conditional-rendering
    2. Rendering multiple elements: https://react.dev/learn/rendering-lists

# States in React

-   Outside of react, it could be a state of rest, drinking coffee, or you're currently exercising. Data to describe what's hapening to something.
    In programming it's the current snapshot of your program or at part of it.

1. States trigger component to be re-rendered (recreated), and then they'll be displayed on screen.
