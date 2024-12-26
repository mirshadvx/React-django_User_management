import { configureStore } from "@reduxjs/toolkit";
import userReducer from './home_slice/User_Data_slicer'

export const store = configureStore({
    reducer:{
        User_Data : userReducer,
    }
})

export default store;