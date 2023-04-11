import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorizeMDW from "./middlewares/authorizeMDW.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

const postByAuthor = [
    {
        authorId: 1,
        authorName: 'Zoker',
        posts: [
            "post1 by Zoker",
            "post2 by Zoker",
        ]
    },
    {
        authorId: 2,
        authorName: 'Henry',
        posts: [
            "post1 by Henry",
        ]
    },
    {
        authorId: 3,
        authorName: 'Jon Doe',
        posts: [
            "post1 by Jon Doe",
            "post2 by Jon Doe",
            "post3 by Jon Doe",
        ]
    }
];

app.get("/posts", authorizeMDW, (req, res) => {

    const data = postByAuthor.filter(author => author.authorId === req.userId)[0]?.posts;
    const author = postByAuthor.find(author => author.authorId === req.userId).authorName;

    res.json({
        "Logged in as": author,
        "Posts": data
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});