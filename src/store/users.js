import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// export const pullMoreUsers = createAsyncThunk(
//     'data/pullMoreUsers',
//     (info) => {
//         if(info.method === 'GET') {
//             axios.get(info.url, {
//                 headers: {
//                     Authorization: 'Bearer '+ info.token
//                 }
//             })
//             .then(res => {
//                 return res.data.users;
//             })
//         }
//     }
// );

const usersSlices = createSlice({
    name: 'UsersSlice',
    initialState: {
        youMightLike: [],
        moreUsers: [],
    }, 
    reducers: {
        YOUMIGHTLIKEDATA: (state, action) => {
            state.youMightLike = action.payload;
        },
        MOREUSERS: (state, action) => {
            state.moreUsers = action.payload;
        }
    },
    extraReducers(builder) {
    }
});

export const { YOUMIGHTLIKEDATA, MOREUSERS } = usersSlices.actions;
export default usersSlices.reducer;