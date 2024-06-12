const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    
    
    if(!username || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    // Find user by username
    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) {
        return res.status(401).json({ error: 'Unauthorized - user not found' });
    }

    // Check if the password is valid
    const passwordMatch = await bcrypt.compare(password, foundUser.password_hash);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Unauthorized - incorrect password' });
    }

    // Create JWT access token
    const accessToken = jwt.sign(
        { 
            UserInfo: { 
                username: foundUser.username, 
                // roles: foundUser.roles, 
                isAdmin: foundUser.isAdmin,
                id: foundUser._id 
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    // Create JWT refresh token
    const refreshToken = jwt.sign(
        { 
            UserInfo: { 
                username: foundUser.username, 
                roles: foundUser.roles, 
                id: foundUser._id 
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Set secure cookie with the refresh token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send the access token to the client
    res.json({ accessToken });

}) 


// @route GET /auth/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    console.log('cookies: ', cookies); 

    if(!cookies.refreshToken) {
        return res.status(403).json({ error: 'Forbidden 2 - refresh' })
        // return res.status(401).json({ message: 'Unauthorized 4 - refresh' })
    }

    const refreshToken = cookies.refreshToken

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden 3 - refresh' })
                // return res.status(401).json({ message: 'Unauthorized 5 - refresh' })
            }

            const foundUser = await User.findById(decoded.UserInfo.id).exec()

            if (!foundUser) {
                // return res.status(403).json({ error: 'Forbidden 4 - refresh' })
                return res.status(401).json({ message: 'Unauthorized 6 - refresh' })
            }

            const accessToken = jwt.sign(
                { 
                    UserInfo: { 
                        username: foundUser.username, 
                        roles: foundUser.roles, 
                        id: foundUser._id 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            )

            console.log('accessToken 99: ', accessToken);
            res.json({ accessToken, cc:'vrai' })
        })
    )
})


// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204) //No Content

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Logged out - Cookie cleared' })
})


module.exports = { login, refresh, logout }