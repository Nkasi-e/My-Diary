const {
  validateRegister,
  validateLogin,
  updateUser,
} = require('./userValidation');

const options = { language: { key: '{{key}} ' } };

// validation
function validateRegisterDetails(user) {
  return validateRegister.validate(user, options);
}

function validateLoginDetails(user) {
  return validateLogin.validate(user, options);
}

function validateUpdate(user) {
  return updateUser.validate(user, options);
}

// Custom Error Message
function errorResponse(res, status, code, message, field) {
  return res.status(status).json({
    error: {
      status,
      code,
      message,
      field: field || '',
    },
  });
}

module.exports = {
  validateRegisterDetails,
  validateLoginDetails,
  validateUpdate,
  errorResponse,
};
