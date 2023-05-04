import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
        myTweets: [],
        loadingState: 'idle',
        error: ''
    },
    reducers: {
        PUSHNEWTWEET: (state, action) => {
            state.myTweets.push(action.payload)
        }
    }, 
    extraReducers(builder) {
        builder
        .addCase(pullMyTweets.pending,(state, action) => {
            state.loadingState = 'loading';
        })
        .addCase(pullMyTweets.fulfilled, (state, action) => {
            state.loadingState = 'succeeded';
            state.myTweets = action.payload;
        })
        .addCase(pullMyTweets.rejected, (state, action) => {
            state.loadingState = 'failed';
            state.error = 'something went wrong server-side';
        })
    }
});

export const { PUSHNEWTWEET } = tweetSlice.actions;

export default tweetSlice.reducer;