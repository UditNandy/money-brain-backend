const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { STATUS_CODES, ERROR_MESSAGES, ERROR_CODES } = require("../constants/errorCodes");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        ERROR_MESSAGES.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORIZED,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];

    // 3. verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. attach user
    req.user = {
      id: decoded.userId, // JWT payload has 'userId' according to auth.service.js
    };
    console.log('From middleware',req.body)
    next();
  } catch (err) {
    next(
      new ApiError(
        ERROR_MESSAGES.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORIZED,
        ERROR_CODES.UNAUTHORIZED
      )
    );
  }
};

module.exports = authMiddleware;
