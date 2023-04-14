//*Check the expiration and refresh access token with axios interceptor

import axios from "axios";
import jwt_decode from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post("/api/v1/auth/refresh", {
            withCredentials: true
            //means: "I have a cookie that need to be attached". Check for backend cookies settings. 
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
};

//The code block below is called "axios interceptor", an axios instance that will "jump in" to check and execute some other logics before a http request is being called. Use it to generate new access token if old one is expired before fetching a resource that required authorization with valid access token.

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(

        async (config) => {

            const decodedToken = jwt_decode(user?.accessToken);
            //returning data same as using jwt.io decoder GUI

            let date = new Date();

            if (decodedToken.exp < date.getTime() / 1000) {
                //checking condition: access token is expired or not. If yes, create a new access token and update it into current user state to keep user logged-in.

                const data = await refreshToken();
                const refreshedUser = {
                    ...user,
                    accessToken: data.newAccessToken,
                    //refreshToken is already attached in cookie
                };

                dispatch(stateSuccess(refreshedUser));
                //login again with new access token to continue using the app

                config.headers['Authorization'] = "Bearer " + data.newAccessToken;
            };
            return config;
            //return the config obj with updated token to properly execute the next API call
        }, (error) => {
            return Promise.reject(error);
        });
    return newInstance;
}