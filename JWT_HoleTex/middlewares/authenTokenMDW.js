import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenTokenMDW = (req, res, next) => {

    // extract the token from [Bearer token] as config in jwt.http / can be input using ThunderClient GUI

    const token = req.header('Authorization').replace("Bearer ", "");

    if (!token) res.status(401);

    //verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
        console.log(err, data);
        if (err) res.status(403);
        next();
    });

}

export default authenTokenMDW;