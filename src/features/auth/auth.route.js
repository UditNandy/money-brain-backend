const express = require('express')
const { loginController, signupController } = require('./auth.controller')

const authRoute = express.Router()

authRoute.route('/login').post(loginController)
authRoute.route("/register").post(signupController);

module.exports = authRoute