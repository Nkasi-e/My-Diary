// Custom Error Message
function errorResponse(res, status, message, field) {
  return res.status(status).json({
    error: {
      status,
      message,
      field: field || '',
    },
  });
}

module.exports = errorResponse;
