const express = require("express");
const { addUserProfile, getUserProfile } = require("./userProfile.controller");

const userProfileRouter = express.Router();

userProfileRouter.route("/").get(getUserProfile);

userProfileRouter.route("/").put(() => {});

userProfileRouter.route("/").post(addUserProfile);

module.exports = userProfileRouter;
