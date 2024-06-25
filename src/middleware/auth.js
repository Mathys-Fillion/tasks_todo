/* Jsonwebtoken */
const jwt = require('jsonwebtoken');

/* Dotenv */
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.token;
    if (!authHeader && !token) {
        return res.status(401).json({ "msg" : "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ "msg" : "Token is not valid" });
    }
};
  
module.exports = verifyToken;
