const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const requireAuth = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                logger.error(err.message);
                res.status(401).json({message: "Invalid Auth credentials"})
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({message: "No Auth credentials"})
    }
};

module.exports = { requireAuth };