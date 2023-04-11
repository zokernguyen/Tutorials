import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,//return user info after login success
            isFetching: false,//await for login progress
            error: false//
        }
    },

    reducers: {
        //actions:

        loginStart: (state) => {
            state.login.isFetching = true;
        },

        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },

        loginFailed: (state) => {
            state.isFetching = false;
            state.error = true
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed
} = authSlice.actions;

export default authSlice.reducer;