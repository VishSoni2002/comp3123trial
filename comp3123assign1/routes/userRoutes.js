const express = require("express");
const { signUpUser, loginUser } = require("../controller/userController");
const route = express.Router();

route.post('/signup', signUpUser);
route.post('/login', loginUser);

module.exports = route;
