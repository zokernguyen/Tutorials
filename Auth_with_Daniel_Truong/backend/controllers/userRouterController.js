import User from "../models/User.js";

const userRouterController = {

    //Get all users
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json({
                message: "All users loaded success",
                data: allUsers
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Delete user
    deleteUser: async (req, res) => {
        try {
            const idToDel = req.params.id;
            // const isExisted = await User.findById(idToDel);

            // if (!isExisted) {
            //     throw new Error(`User with id ${idToDel} is not found!`);
            // };

            const delUser = await User.findByIdAndDelete(idToDel);
            res.status(200).json({
                message: "Delete user success",
            });

        } catch (err) {
            res.status(400).json(err.message)
        }
    }
}

export default userRouterController;

