const jwt = require('jsonwebtoken')
const User = require('../models/User');
require('dotenv').config()

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized 1' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Not authorized, token failed - Forbidden 1' })

            req.user = decoded.UserInfo.username
            // req.is = decoded.UserInfo.is
            next()
        }
    )
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin - Unauthorized 1' });
    }
};

module.exports = {isAuthenticated, isAdmin} 