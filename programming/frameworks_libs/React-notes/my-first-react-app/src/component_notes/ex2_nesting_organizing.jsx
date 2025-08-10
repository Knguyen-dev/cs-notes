/*

1. Components are just regular javascript functions that return JSX, so you can keep multiple components in the same file. This helps 
    when your components are relatively small or are very related to each other. 

2. Since 'Profile' components are rendered inside 'Gallery', Gallery is the parent component, and Profile is the child in this case.

Pitfall: 
    1. You can't nest Component definitions inside each other.
    2. Define all components at the very top, then do your export statements at the bottom. This prevents bugs and 
        slow performance.

*/

// Pitfall, you can't do this because you're defining Profile in the Gallery component
// export default Function Gallery() {
//     function Profile() {
//     }
// }
