const sendSuccessResponse = (res, data, message) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const sendErrorResponse = (res, error, message) => {
  return res.status(500).json({
    success: false,
    message,
    error: error.message || error,
  });
};

const sendNotFoundResponse = (res, message) => {
  return res.status(403).json({
    success: false,
    message,
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  sendNotFoundResponse,
};
