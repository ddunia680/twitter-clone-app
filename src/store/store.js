import { configureStore } from "@reduxjs/toolkit";
import uiStates from "./uiStates";
import authenticate from "./authenticate";
import users from "./users";
import tweets from "./tweets";

const store = configureStore({
    reducer: {
        uiStates: uiStates,
        authenticate: authenticate,
        users: users,
        tweets: tweets
    }
});

export default store;