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

module.exports = {
  validateRegisterDetails,
  validateLoginDetails,
  validateUpdate,
};
