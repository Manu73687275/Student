const jwt =require("jsonwebtoken");
const tokenSecret = "manu";
const { User } = require("../models/user.model");


 const jsonwebtoken = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing",
                status: false,
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Authorization token missing",
                status: false,
            });
        }

        const decoded = jwt.verify(token, tokenSecret);
        req.email=decoded.email;
        next();
    } catch (error) {
        return res.status(500).json({
            msg:error.message,
            message: "Internal server error",
            status: false,
            auth: false,
        });
    }
};

module.exports = {jsonwebtoken};