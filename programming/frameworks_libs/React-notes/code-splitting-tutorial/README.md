# Code Splitting
The idea that rather than loading your entire application at once, you only load parts of your application when you need them. 

## Lazy Loading
Lazy loading is a technique related to code splitting, where modules or components are only loaded when they are required. This can help reduce the initial load time of your application by only loading essential parts upfront and deferring the loading of non-essential parts until later.

## Don't misuse codesplitting
1. Use it in moderation, don't excessively codesplit. It isn't a cheatcode for better performance. You should only use it when there are portions of the app that aren't needed until the user initiates a process. Such as when a component is hidden until the user clicks a button, here lazy loading could be good. It's common to start codesplitting at the router level, and then decide whether you need more in other parts of your app.
2. Remember the user-experience, too many loading screens due to lazy loading isn't good for the user experience.
3. Also, make sure to use profilers and performance measuring tools when doing any type of performance testing.


# Credits:
1. [Code Splitting (Web Dev Simplified)](https://www.youtube.com/watch?v=JU6sl_yyZqs)