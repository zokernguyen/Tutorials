import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

let refreshTokens = [];
//better use "Redis" to store refresh tokens.

const authRouterController = {

    //Register
    registerUser: async (req, res) => {
        try {

            //check duplicate
            const nameIsDuplicated = await User.findOne({
                username: req.body.username
            })
            const emailIsDuplicated = await User.findOne({
                email: req.body.email
            })

            if (nameIsDuplicated || emailIsDuplicated) {
                res.status(409).json("Username or email already existed!")
            }

            //encode password
            const password = req.body.password;
            const hashedPW = bcrypt.hashSync(password, 10);

            //create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPW,
            });

            //save to db
            const user = await newUser.save();

            res.status(200).json({
                message: "New user created successfully",
                data: user,
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Generate access token
    genAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );
    },

    //Generate refresh token
    genRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "365d" }
        );
    },

    //Login
    loginUser: async (req, res) => {
        try {

            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                res.status(404).json("Username not found!");
            };

            const isValidPW = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!isValidPW) {
                res.status(404).json("Password is incorrect!");
            };

            if (user && isValidPW) {
                const accessToken = authRouterController.genAccessToken(user);
                const refreshToken = authRouterController.genRefreshToken(user);

                //storing refresh token to check who is requesting to refresh
                refreshTokens.push(refreshToken);

                //storing refresh token in cookies to generate new access token when old one is expired
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });

                const { password, ...others } = user._doc;
                //exclude sensitive data from the user document before sending it in the response.
                //user._doc = only get stored value (user = including user template/model and other structural values/metadata)

                res.status(200).json({ ...others, accessToken, refreshToken });
                //do not expose password here
            };
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    //Refresh access token
    getRefreshToken: async (req, res) => {
        //extract refresh token from req.cookies (from user's request)
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json("You are not authenticated");
        };

        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Invalid refresh token");
        };

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) console.log(err);

            //after using the (old) refresh token to verify and extract payload to generate a new access token, delete it from the storing array
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);

            //generate new access and refresh token
            const newAccessToken = authRouterController.genAccessToken(user);
            const newRefreshToken = authRouterController.genRefreshToken(user);

            //now store the (new) refresh token to the array for cheking who is requesting in the next time
            refreshTokens.push(newRefreshToken);

            //storing new refresh token in cookies
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });

            //sending new access token after refreshing to user
            res.status(200).json({
                newAccessToken: newAccessToken
            });
        });
    },

    //logout
    logoutUser: async (req, res) => {
        //when user logout, also remove his refresh token from res.cookies...
        res.clearCookie("refreshToken");

        //as well as from the storing array (that's mocking another database)
        refreshTokens = refreshTokens.filter(
            token => token !== req.cookies.refreshToken
        );

        res.status(200).json({
            message: "You are logged out"
        });

        //current access token will be removed from client side since it is stored in Redux store.
    }
};

export default authRouterController;
