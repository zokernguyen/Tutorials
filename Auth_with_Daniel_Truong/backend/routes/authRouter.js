import express from "express";
import authRouterController from "../controllers/authRouterController.js";
import authMDWController from "../controllers/authMDWController.js";

const authRouter = express.Router();

//Register
authRouter.post("/register", authRouterController.registerUser);

//Login
authRouter.post("/login", authRouterController.loginUser);

//Refresh access token
authRouter.post("/refresh", authRouterController.getRefreshToken);

//Logout. Passing login step is required to logout => using verifyToken MDW
authRouter.post("/logout", authMDWController.verifyToken, authRouterController.logoutUser);

export default authRouter;