import admin from "../config/firebase-config.js";

const decodeToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        console.log(decodeValue);
        if (decodeValue) return next();
        return res.json({ message: "Unauthorized" });
    } catch (error) {
        return res.json({ message: "Internal Error" });
    }
}

export default decodeToken;