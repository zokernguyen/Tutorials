import jwt from "jsonwebtoken";

const authorizeMDW = (req, res, next) => {

    // extract the token from req.header
    const authorizeHeader = req.header('Authorization');
    //check if undefined/null first to prevent error
    const token = authorizeHeader && authorizeHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        const decodedReq = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


        //decoded data is the userPayload that used to generate token. Assgin it to a key in req obj to pass the data for operating in next steps
        // console.log(decodedReq);
        req.userId = decodedReq.id;

        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }

}

export default authorizeMDW;