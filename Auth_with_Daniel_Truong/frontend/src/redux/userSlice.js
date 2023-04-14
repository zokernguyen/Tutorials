import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: [],
            isFetching: false,
            error: false
        },

        msg: ""
    },

    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = false;
        },

        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },

        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.allUsers = [];
            state.users.error = true;
            state.msg = "Can not get users"
        },

        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },

        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.msg = action.payload.message
        },

        deleteUserFailed: (state, action) => {
            state.users.error = true;
            state.msg = action.payload.message
        }
    }
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
} = userSlice.actions;

export default userSlice.reducer;
