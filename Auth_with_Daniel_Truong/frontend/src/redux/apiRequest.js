import axios from 'axios';
import { loginStart, loginSuccess, loginFailed } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
}; 