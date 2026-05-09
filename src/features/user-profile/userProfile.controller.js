const {
  addUserProfileDetailsQuery,
  getUserProfileQuery,
} = require("./userProfile.query");
const ApiError = require("../../utils/ApiError");

const addUserProfile = async (req, res, next) => {
  try {
    const userData = req.body;
    await addUserProfileDetailsQuery({ ...userData, userId: req.user.id });

    return res.json({
      status: "success",
      message: "User profile created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getUserProfileQuery(userId);

    if (result.rows.length === 0) {
      throw new ApiError(
        "User profile not found",
        404,
        "USER_PROFILE_NOT_FOUND",
      );
    }

    return res.json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addUserProfile, getUserProfile };
