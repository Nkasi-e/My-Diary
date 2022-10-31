const {
  validateRegister,
  validateLogin,
  updateUser,
  resetPassword,
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

function validateEmail(user) {
  return resetPassword.validate(user, options);
}

module.exports = {
  validateRegisterDetails,
  validateLoginDetails,
  validateUpdate,
  validateEmail,
};
