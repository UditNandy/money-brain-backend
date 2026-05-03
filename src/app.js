const express = require("express");
const authRoute = require("./features/auth/auth.route.js");
const {errorMiddleware} = require("./middlewares/error.middleware")

const app = express();

app.use(express.json());

app.use('/api/auth', authRoute)
app.use(errorMiddleware)

module.exports = app

