import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onForYou: true,
        onFolliwing: false,
        showLeftMenu: false,
        onUserTweet: true,
        onUserReplies: false,
        onUserMedia: false,
        onUserLikes: false,
        focusNewTweet: false
    },
    reducers: {
        SETONFORYOU: (state, action) => {
            state.onForYou = true;
            state.onFolliwing = false;
            state.onUpdates = false;
        },
        SETONFOLLOWING: (state, action) => {
            state.onForYou = false;
            state.onFolliwing = true;
            state.onUpdates = false;
        },
        SETONUSERTWEETS: (state, action) => {
            state.onUserTweet = true;
            state.onUserReplies = false;
            state.onUserMedia = false;
            state.onUserLikes = false;
        },
        SETONUSERREPLIES: (state, action) => {
            state.onUserTweet = false;
            state.onUserReplies = true;
            state.onUserMedia = false;
            state.onUserLikes = false;
        },
        SETONUSERMEDIA: (state, action) => {
            state.onUserTweet = false;
            state.onUserReplies = false;
            state.onUserMedia = true;
            state.onUserLikes = false;
        },
        SETONUSERLIKES: (state, action) => {
            state.onUserTweet = false;
            state.onUserReplies = false;
            state.onUserMedia = false;
            state.onUserLikes = true;
        },
        SETSHOWLEFTSMENU: (state, action) => {
            state.showLeftMenu = action.payload;
        },
        FOCUSONNEWTWEET: (state, action) => {
            state.focusNewTweet = action.payload;
        }
    }
});

export const { 
    SETONFORYOU, 
    SETONFOLLOWING,
    SETONUSERTWEETS,
    SETONUSERREPLIES,
    SETONUSERMEDIA,
    SETONUSERLIKES,
    SETSHOWLEFTSMENU,
    FOCUSONNEWTWEET
} = uiStates.actions;

export default uiStates.reducer;
