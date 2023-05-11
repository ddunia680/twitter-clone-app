import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const pullTweets = createAsyncThunk(
    'data/pullTweets',
    (info) => {
        if(info.method === 'GET') {
            return axios.get(info.url, {
                headers: {
                    Authorization: 'Bearer '+ info.token
                }
            })
            .then(res => {
                return res.data.tweets;
            })
        }
    }
)

export const pullMyTweets = createAsyncThunk(
    'data/pullMyTweets',
    (info) => {
        if(info.method === 'GET') {
            return axios.get(info.url, {
                headers: {
                    Authorization: 'Bearer '+ info.token
                }
            })
            .then(res => {
                return res.data.tweets;
            })
        }
    }
)

const tweetSlice = createSlice({
    name: 'tweets',
    initialState: {
        tweets: [],
        myTweets: [],
        loadingState: 'idle',
        myTweetLoadingState: 'idle',
        error: ''
    },
    reducers: {
        PUSHNEWTWEET: (state, action) => {
            state.tweets.push(action.payload);
        }
    }, 
    extraReducers(builder) {
        builder
        .addCase(pullTweets.pending,(state, action) => {
            state.loadingState = 'loading';
        })
        .addCase(pullTweets.fulfilled, (state, action) => {
            state.loadingState = 'succeeded';
            const theTweets = action.payload;
            theTweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            // console.log(theTweets);
            state.tweets = theTweets;
        })
        .addCase(pullTweets.rejected, (state, action) => {
            state.loadingState = 'failed';
            state.error = 'something went wrong server-side';
        });

        builder
        .addCase(pullMyTweets.pending, (state, action) => {
            state.myTweetLoadingState = 'loading';
        })
        .addCase(pullMyTweets.fulfilled, (state, action) => {
            state.myTweetLoadingState = 'succeeded';
            const theTweets = action.payload;
            theTweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            state.myTweets = theTweets;
        })
        .addCase(pullMyTweets.rejected, (state, action) => {
            state.myTweetLoadingState = 'failed';
        });
    }
});

export const { PUSHNEWTWEET } = tweetSlice.actions;

export default tweetSlice.reducer;