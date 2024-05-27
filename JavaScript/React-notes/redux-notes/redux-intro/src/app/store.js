/*
+ Redux store: Basically the single object that contains all of the state in your app (or at least the global ones) 
    in an 'immutable object tree'. The idea is to have a single store, and of course it's possible to have multiple 
    stores, but the creators/maintainers of Redux strongly recommend against doing that.

    Your store will have 'reducers' which are like the state update functions that your UI will use.


- How to create a store:
1. import 'configure store'
2. export your store. 
3. Then import your store in your main.jsx. Here you'll provide your global 
    state to your app tree.
4. We import any reducers that our slices have here.
5. Then we put them in the 'reducer' property. As a result this provides 
    those reducers to our app through that provider in main.jsx.
    Now we can use the separate 'reducer' functions in each of our slices.

- NOTE: Since we used default exports, we can choose the name 
    for the default export when we import it here.
*/


import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import postsReducer from "../features/posts/postsSlice"
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {

    // make sure the names of the slices match the reducer
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
