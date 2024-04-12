import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name:"user",
    initialState:{
        user: null
    },
    reducers:{
        getUser : (state, action)=>{
            state.user = action.payload
        },
        removeUser : (state, action)=>{
            state.user = null
        }
    }
});

export  {userSlice}
export const {getUser, removeUser} = userSlice.actions