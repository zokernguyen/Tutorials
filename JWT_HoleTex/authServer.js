//split server to process login service

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); //load variables from .env file into NodeJS

const authServer = express();
authServer.use(express.json());

const PORT = 9696;

authServer.post("/login", (req, res) => {
    //Authentication process: ...

    //Authorization:

    //use login data in req.body as payload to create token
    // {
    //     "username": <...>,
    //     "password": <...>
    // }

    const data = req.body;

    //create token
    const accessToken = jwt.sign(
        data,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1h" });
    /*
    params:
    - 1st param (data): user req.body payload,
    - 2nd param (env...): read .env file to get the secret key, this secret key will be combined with the payload to generate the token,
    - 3rd param ({...}): expire time to secure the token. Can add more encode options.
    */

    //return token to client
    res.json({ accessToken });
});

authServer.listen(PORT, () => {
    console.log(`AuthServer is running on port ${PORT}`);
});