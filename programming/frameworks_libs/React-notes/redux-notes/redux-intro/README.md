# Redux notes 

## What is Redux vs Redux Toolkit

 

## Why you might not need redux



### How it works
1. Create a store which has reducers. This is your single source of truth that contains your global state in your React application. Then this state is provided to all other components in your App's component tree.
2. For each state you create a 'slice'. A slice is just a piece of state, a slice of state out of the entire pie that is all of your global state. In this slice you'll define the initial state value and then corresponding reducers for that slice. These reducers would be your state updating functions that you'd use in your UI. For example, for a 'pizza' state, some reducers could be 'toggleStuffedCrust', addTopping, etc. Another example is how in a blog, you may have a slice for posts, which defines and encapsulates all functions for updating posts. Or a slice for comments which handles updating comments. The idea is that we use slices to separate things and every major feature in our code gets its own slice.
3. Then you'd use these reducers to update your state and you'd use custom hooks to access the global state. 


## Redux Thunk
Redux does everything synchronously, so if you want some middleware that handles asynchronous operations, the recommended choice is 'Redux Thunk'.





## Project setup
```
npm i @reduxjs/toolkit react-redux date-fns axios
```


# Credits:
1. [Redux in 100 Seconds - Fireship](https://youtu.be/_shA5Xwe8_4?si=xJUQoPZbUTAV9TFE)
2. [React Redux Toolkit Tutorial - Dave Gray](https://youtu.be/u3KlatzB7GM?si=6nJ-t6NiBjtw4Npm)