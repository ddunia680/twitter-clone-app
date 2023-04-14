import { createSlice } from "@reduxjs/toolkit";

const uiStates = createSlice({
    name: 'uiStates',
    initialState: {
        onForYou: true,
        onFolliwing: false,
        onUpdates: false
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
    }
});

export const { SETONFORYOU, SETONFOLLOWING, SETONUPDATES } = uiStates.actions;

export default uiStates.reducer;