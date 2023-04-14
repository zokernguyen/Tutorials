import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess, logoutStart, logoutSuccess, logoutFailed } from "./authSlice";
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {

    dispatch(loginStart());

    try {
        const res = await axios.post("/api/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("/api/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get("/api/v1/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete("/api/v1/user/" + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFailed(error.response.data));
    }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/api/v1/auth/logout", id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(logoutSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(logoutFailed());
    }
}