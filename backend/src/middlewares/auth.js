const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader.replace("Bearer ", "");
        if (!authHeader) {
            return res.status(401).send({ message: "Authorization token not provided.", status: false });
        }
        const decoded = jwt.verify(token, process.env.token_key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed, try login again!", status: false });
    }

};

module.exports = { auth };