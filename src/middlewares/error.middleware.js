const { STATUS_CODES, ERROR_MESSAGES } = require("../constants/errorCodes");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const status = err.status || "error";
  const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  
  const errorResponse = {
    status,
    statusCode,
    message,
    errorCode: err.errorCode || null,
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = { errorMiddleware };
