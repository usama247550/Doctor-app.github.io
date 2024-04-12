import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./redux/features";
import {userSlice} from './redux/getUser';




const store = configureStore({
    reducer:{
        alerts: alertSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;