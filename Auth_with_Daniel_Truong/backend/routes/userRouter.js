import express from "express";
import userRouterController from "../controllers/userRouterController.js";
import authMDWController from "../controllers/authMDWController.js";

const userRouter = express.Router();

userRouter.get("/", authMDWController.verifyToken, userRouterController.getAllUsers);
userRouter.delete("/:id", authMDWController.verifyRole, userRouterController.deleteUser);

export default userRouter;