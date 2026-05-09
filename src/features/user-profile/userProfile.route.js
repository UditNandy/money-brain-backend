const express = require("express");
const { addUserProfile } = require("./userProfile.controller");

const userProfileRouter = express.Router();

userProfileRouter.route("/").get(() => {});

userProfileRouter.route("/").put(() => {});

userProfileRouter.route("/").post(addUserProfile);

module.exports = userProfileRouter;
