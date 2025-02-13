import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



const generateToken = (payload) => {

    const options = {
        expiresIn: process.env.expiresIn, // Token expiration time
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default generateToken;