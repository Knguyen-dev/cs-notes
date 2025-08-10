/*
- Creating our component 

1. useSelector: Custom hook that allows us to access the state
    values in our redux store.
2. useDispatch: Custom hook that, combined with our reducers for our individual
    state slices, help update the state of our slices. Essentially you 
    pass in the results of your slice's reducer functions into this 
    function, so do dispatch(increment())


*/
import {useSelector, useDispatch} from "react-redux";

import {selectCount, increment, decrement, reset, incrementByAmount} from "./counterSlice";
import {useState} from "react";


export default function Counter() {

    /*
    - count: Do state.counter.count to get the count state. The idea 
        is doing state.<sliceName>.<state property in that slice>

        State is the global store, sliceName is the unique name you added 
        to the slice, and 'count' is just the state value, kind of like 
        the 'initialState' object.

    */
    const count = useSelector(selectCount);
    const dispatch = useDispatch();


    // We'll create a local state to track how much we're adding by
    const [incrementAmount, setIncrementAmount] = useState(0);


    // Ensure amount we're adding by is a number; if not default to 0
    const addValue = Number(incrementAmount) || 0;

    /*
    1. Resets how much we're adding by
    2. Resets the count state in counterSlice
    */
    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset())
    }


    return (
        <section>
            <p>{count}</p>

            <div>
                <button onClick={() => dispatch(increment())}>Add</button>
                <button onClick={() => dispatch(decrement())}>Subtract</button>
            
            </div>

            <input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)}/>
            <div>
                {
                /*
                - Action Creator: 'incrementByAmount' is an 'action creator function'. It creates that action object, 
                    with a type, and the payload. So redux toolkit simplifies things so we don't even have 
                    to deal with the action type, we simply just pass in a value to our action creator and that's the 
                    payload being sent to the reducer.

                - Dispatch: When you call dispatch(incrementByAmount(addValue)) you are dispatching an action object to the 
                    Redux store, which causes your state to update.
                - Reducer: 'incrementByAmount' as it updates the state with that payload
                
                
                An action object would typically look like this though. But we don't have to deal with that
                as Redux simplifies this stuff.
                {
                  type: 'counter/incrementByAmount',
                  payload: 5
                }

                */
                }
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    )


}