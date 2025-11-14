const config = require('../config/env.config');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Token not provided'
        });

        try {
            // Verify token
            const decoded = jwt.verify(token, config.development.JWT_SECRET);
            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    }
}

module.exports = authenticateJWT;