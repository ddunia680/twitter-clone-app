import { createSlice } from "@reduxjs/toolkit";

const authenticate = createSlice({
    name: 'authenticate',
    initialState: {
        token: '',
        userId: '',
        fullname: '',
        tagName: '',
        email:'',
        bio: '',
        profileUrl: '',
        coverUrl: '',
        website: '',
        location: '',
        createdAt: ''
    },
    reducers: {
        AUTHENTICATE: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.fullname = action.payload.fullname;
            state.tagName = action.payload.tagName;
            state.email = action.payload.email;
            state.bio = action.payload.bio;
            state.profileUrl = action.payload.profileUrl;
            state.coverUrl = action.payload.coverUrl;
            state.createdAt = action.payload.createdAt;
            if(action.payload.website) {
                state.website = action.payload.website;
            }
            if(action.payload.location) {
                state.location = action.payload.location;
            }
        },
        KEEPAUTHENTICATED: (state, action) => {
            state.token = localStorage.getItem('token');
            state.userId = localStorage.getItem('userId');
            state.fullname = localStorage.getItem('fullname');
            state.bio = localStorage.getItem('bio');
            state.tagName = localStorage.getItem('tagName');
            state.email = localStorage.getItem('email');
            state.profileUrl = localStorage.getItem('profileUrl');
            state.coverUrl = localStorage.getItem('coverUrl');
            state.createdAt = localStorage.getItem('createdAt');
            if(localStorage.getItem('website')) {
                state.website = localStorage.getItem('website');
            }
            if(localStorage.getItem('location')) {
                state.location = localStorage.getItem('location');
            }
        },
        LOGOUT: (state, action) => {
            state.token = '';
            state.userId = '';
            state.fullname = '';
            state.tagName = '';
            state.email = '';
            state.profileUrl = '';
            state.coverUrl = '';
            state.createdAt = '';
            state.website = '';
            state.location = '';

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('fullname');
            localStorage.removeItem('tagName');
            localStorage.removeItem('bio');
            localStorage.removeItem('email');
            localStorage.removeItem('profileUrl');
            localStorage.removeItem('coverUrl');
            localStorage.removeItem('createdAt');
            localStorage.removeItem('website');
            localStorage.removeItem('location');
            localStorage.removeItem('expiryDate');
        }
    }
});

export const { AUTHENTICATE, KEEPAUTHENTICATED, LOGOUT } = authenticate.actions;
export default authenticate.reducer;