//main server to get data

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenTokenMDW from "./middlewares/authenTokenMDW.js";

dotenv.config(); //load variables from .env file into NodeJS

const app = express();
const PORT = process.env.PORT || 6969;
app.use(express.json());

const books = [
    {
        id: 1,
        name: "Chi Pheo",
        author: "Nam Cao"
    },
    {
        id: 2,
        name: "Tat den",
        author: "Ngo Tat To",
    },
    {
        id: 3,
        name: "So do",
        author: "Vu Trong Phung"
    }
];

app.get("/books", authenTokenMDW, (req, res) => {
    res.json({
        status: "success",
        data: books
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});