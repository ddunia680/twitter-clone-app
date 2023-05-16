import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onForYou: true,
        onFolliwing: false,
        onUpdates: false,
        onFeed: true,
        onUserIdentity: false,
        onMorePeople: false,
        showLeftMenu: false,
        onUserTweet: true,
        onUserReplies: false,
        onUserMedia: false,
        onUserLikes: false,
        connectIU: false,
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
        SETONUPDATES: (state, action) => {
            state.onForYou = false;
            state.onFolliwing = false;
            state.onUpdates = true;
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
        SETONUSERIDENTITY: (state, action) => {
            state.onFeed = false;
            state.onUserIdentity = true;
            state.onMorePeople = false;
        },
        SETONFEED: (state, action) => {
            state.onFeed = true;
            state.onUserIdentity = false;
            state.onMorePeople = false;
        },
        SETONMOREPEOPLE: (state, action) => {
            state.onFeed = false;
            state.onUserIdentity = false;
            state.onMorePeople = true;
        },
        SETCONNECTUI: (state, action) => {
            state.connectIU = action.payload;
        },
        FOCUSONNEWTWEET: (state, action) => {
            state.focusNewTweet = action.payload;
        }
    }
});

export const { 
    SETONFORYOU, 
    SETONFOLLOWING, 
    SETONUPDATES,
    SETONUSERTWEETS,
    SETONUSERREPLIES,
    SETONUSERMEDIA,
    SETONUSERLIKES,
    SETSHOWLEFTSMENU,
    SETONFEED,
    SETONUSERIDENTITY,
    SETONMOREPEOPLE,
    SETCONNECTUI,
    FOCUSONNEWTWEET
} = uiStates.actions;

export default uiStates.reducer;