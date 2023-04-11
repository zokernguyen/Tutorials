import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6666;

let users = [
    {
        id: 1,
        role: "author",
        username: 'Zoker',
        refToken: null
    },
    {
        id: 2,
        role: "author",
        username: 'Henry',
        refToken: null
    },
    {
        id: 3,
        role: "author",
        username: 'Jon Doe',
        refToken: null
    }
];

const generateTokens = userPayload => {

    const accessToken = jwt.sign(
        userPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
    );

    const refreshToken = jwt.sign(
        userPayload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    return { accessToken, refreshToken };

};

const updateRefreshToken = (usernamePayload, refreshToken) => {
    users = users.map(user => {
        if (user.username === usernamePayload)
            return {
                ...user,
                refreshToken
            }
        console.log(users);
        return user;
    });
}

app.use(express.json());

app.post("/login", (req, res) => {

    const username = req.body.username;
    //get name to filter

    const userPayload = users.find(user => user.username === username);
    //get user data (payload to generate tokens) by filtering username

    if (!userPayload) res.sendStatus(401);

    const tokens = generateTokens(userPayload);
    updateRefreshToken(username, tokens.refreshToken);

    res.json(tokens);
})

app.listen(PORT, () => {
    console.log(`AuthServer is running on port ${PORT}`);
});