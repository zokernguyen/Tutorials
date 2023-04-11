import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlenght: 6,
        maxlenght: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlenght: 10,
        maxlenght: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
    },
    admin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }); //option: log timestamp of create user operation

const User = mongoose.model("User", userSchema);
export default User;