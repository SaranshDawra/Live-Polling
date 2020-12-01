const jwt = require('jsonwebtoken');
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers["auth-token"];
    try {
        if (!token) {
            return res.status(400).send('Not Authorized');
        }
        const decodedToken = jwt.verify(token, process.env.jwtPrivateKey);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return res.status(400).send('Not Authorized');
    }
};

module.exports = auth;