const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = await User.findById(decode.id).select("-password")

            if (!req.user) {
                throw new Error('Invalid User Token')
            }
            next()
        }

        if (!token) {
            throw new Error('Not authorized, Invalid token')
        }

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}


module.exports = { protect }