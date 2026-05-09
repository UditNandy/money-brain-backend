const express = require('express')
const { loginController, signupController } = require('./auth.controller')

const authRouter = express.Router();

authRouter.route("/login").post(loginController);
authRouter.route("/register").post(signupController);

module.exports = authRouter;