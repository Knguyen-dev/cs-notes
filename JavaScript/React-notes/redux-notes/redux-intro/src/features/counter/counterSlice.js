/*

+ Creating a slice of state:
The counter is going to use state, so since we're using redux, we'll encapsulate all of 
that state logic within its own slice.


1. Define initial state value
2. We then define a unique name for the slice. We will access the state value through this 
    unique name later, so ensure it's unique and easy to type out.
    It willalso match the key in which we include the reducer in our 
    Redux store configuration.
3. Finally we'll create some 'reducers', whcih are again the functions
    that we'll expose/use to update the state.


*/
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({


  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    /*
    - NOTE: This is very similar to useReducer hook

    Every reducer in your slice will receive the current state as a parameter.
    Then you simply 'create' a mutation. Here we do state.count += 1 to indicate
    that we are increasing the state by 1.

    Unlike regular react, when using the Redux-toolkit we don't need to return a value 
    to indicate what value we want to update the state with. Redux uses the 'Immer' library
    under the hood, and this just allows us to write 'mutating logic' to update the 
    state. Allowing us to directly modify the state object, which is something 
    very foreign in regular react.

    So yeah, in traditional redux, we gotta return a new state object, but with the toolkit
    we can just do things directly. This is their attempt at simplifying code and reducing boilerplate.
    
    Assuming that our reducer is already included in our store, that means we can 
    simply export our new functions and they'll work since they've been provided by the 
    store.
    */
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
        state.count = 0;
    },

    // Your reducers can also receive an 'action' and payload like regular useReducer.
    incrementByAmount: (state, action) => {
        state.count += action.payload
    }
  },
});



export const selectCount = (state) => state.counter.count;

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
