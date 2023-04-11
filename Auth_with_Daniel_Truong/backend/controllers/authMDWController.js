import jwt from "jsonwebtoken";

const authMDWController = {

    //MDW to verify accessToken

    verifyToken: (req, res, next) => {
        const accessToken = req.header('authorization').replace("Bearer ", "");

        if (!accessToken) {
            return res.status(401).json({ error: "Missing access token" });
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Access token has expired" });
                } else {
                    return res.status(401).json({ error: "Invalid access token" });
                }
            }

            req.user = user;
            next();
        });
    },

    //MDW to verify user's role before executing delete method. Only admin has the permission to delete other user's profile. Basic users can only delete their own profile.

    verifyRole: (req, res, next) => {

        authMDWController.verifyToken(req, res, () => {
            const { id } = req.user;

            if (id == req.params.id) {
                return res.status(400).json({ message: "You cannot delete your own profile" });
            }

            if (id !== req.params.id && !req.user.admin) {
                return res.status(403).json({ message: "You don't have permission for this action" });
            }

            next();
        });
    }
}

export default authMDWController;
