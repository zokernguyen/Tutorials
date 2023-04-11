import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

async function connectDB() {

    await mongoose.connect("mongodb+srv://zoker_nguyen:zoker666@cluster0.fis8kch.mongodb.net/test");

    console.log("Connected to DB");

};

app.use(express.json());
app.use(cors());//prevent cross-origin request errors
app.use(cookieParser());//

//ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});





