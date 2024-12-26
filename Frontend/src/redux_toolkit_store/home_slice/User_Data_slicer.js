import { createSlice } from "@reduxjs/toolkit";


const User_Data_slicer = createSlice({
    name : 'user_data',
    initialState : {
            username: '',
            email: '',
            phone_number: '',
            address: '',
            gender: '',
            profile_picture: '',
    },
    reducers: {
        set_user_data : (state, action) => {
            const { username, email, phone_number, address, gender, profile_picture } = action.payload;
            state.username = username;
            state.email = email;
            state.phone_number = phone_number;
            state.address = address;
            state.gender = gender;
            state.profile_picture = profile_picture;
            // console.log(action.payload,"its store");
        }
    },
})

export const { set_user_data } = User_Data_slicer.actions;
export default User_Data_slicer.reducer;