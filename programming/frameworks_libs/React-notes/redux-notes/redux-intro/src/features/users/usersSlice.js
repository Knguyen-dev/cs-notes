import {createSlice } from "@reduxjs/toolkit";


const initialState = [
    {id: '0', name: "Dan Kimora"},
    {id: '1', name: "Jane Hills"},
    {id: '2', name: "Darcy Prescott"},  
]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})



// Callback function to useSelector
export const selectAllUsers = state => state.users;

// Export reducer so that it can be imported to data store 
export default usersSlice.reducer;