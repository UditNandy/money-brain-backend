const { signupService, loginService } = require("./auth.service");
const ApiError = require("../../utils/ApiError");
const {
  STATUS_CODES,
  ERROR_MESSAGES,
  ERROR_CODES,
} = require("../../constants/errorCodes");

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(
        ERROR_MESSAGES.MISSING_CREDENTIALS,
        STATUS_CODES.BAD_REQUEST,
        ERROR_CODES.MISSING_CREDENTIALS,
      );
    }

    email = email.toLowerCase().trim();

    const result = await loginService(email, password);

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const signupController = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(
        ERROR_MESSAGES.MISSING_CREDENTIALS,
        STATUS_CODES.BAD_REQUEST,
        ERROR_CODES.MISSING_CREDENTIALS,
      );
    }

    email = email.toLowerCase().trim();

    const result = await signupService(email, password);

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { loginController, signupController };
