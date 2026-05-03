const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, addNewUser } = require("./auth.query");
const ApiError = require("../../utils/ApiError");
const { STATUS_CODES, ERROR_MESSAGES, ERROR_CODES } = require("../../constants/errorCodes");

const signupService = async (email, password) => {
  try {
    const existing = await findUserByEmail(email);

    if (existing.rows.length) {
      throw new ApiError(
        ERROR_MESSAGES.USER_ALREADY_EXISTS,
        STATUS_CODES.BAD_REQUEST,
        ERROR_CODES.USER_ALREADY_EXISTS,
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    let result;
    try {
      result = await addNewUser(email, hashed);
    } catch (e) {
      if (e.code === "23505") {
        throw new ApiError(
          ERROR_MESSAGES.USER_ALREADY_EXISTS,
          STATUS_CODES.BAD_REQUEST,
          ERROR_CODES.USER_ALREADY_EXISTS,
        );
      }
      throw e;
    }
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return { user: result.rows[0], token };
  } catch (err) {
    throw new ApiError(
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
    );
  }
};

const loginService = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user.rows.length) {
      throw new ApiError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        STATUS_CODES.BAD_REQUEST,
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      throw new ApiError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        STATUS_CODES.BAD_REQUEST,
        ERROR_CODES.INVALID_CREDENTIALS,
      );
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return { user: user.rows[0], token };
  } catch (err) {
    throw new ApiError(
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
    );
  }
};

module.exports = {
  signupService,
  loginService,
};
