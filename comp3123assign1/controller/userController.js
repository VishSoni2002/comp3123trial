const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');

const signUpUser = async (req, res) => {

    await check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .run(req);

    await check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .run(req);

    await check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPassword,
        });

        res.status(201).json({
            status: true,
            message: "User created successfully.",
            user_id: newUser._id
        });

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

const loginUser = async (req, res) => {

    await check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .run(req);

    await check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid email address");
        }

        if (email && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                status: true,
                message: "Login successful.",
                token: accessToken(user._id)
            });
        } else {
            throw new Error('Wrong Password!')
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

const accessToken = (payLoad) => {
    const newAccessToken = jwt.sign({ id: payLoad }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
    });
    return newAccessToken;
};



module.exports = { signUpUser, loginUser }