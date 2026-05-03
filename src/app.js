const express = require("express");
const authRoute = require("./features/auth/auth.route.js");
const { errorMiddleware } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

app.use((req, res, next) => {
  next(new ApiError("path not found", 404, "PATH_NOT_FOUND"));
});

app.use(errorMiddleware);

module.exports = app;
