const nameErrorMessage = {
  'any.required': `User's name is required`,
  'string.empty': 'The name field is not allowed to be empty',
  'string.email': 'name must be a valid email address',
  'string.min': 'name must be at least {{#limit}} character long',
  'string.max':
    'name length must be less than or equal to {{#limit}} character long',
};
const emailErrorMessage = {
  'any.required': `User's email is required`,
  'string.empty': 'The email field is not allowed to be empty',
  'string.email': 'email must be a valid email address',
  'string.min': 'email must be at least {{#limit}} character long',
  'string.max':
    'email length must be less than or equal to {{#limit}} character long',
};
const passwordErrorMessage = {
  'any.required': `User's password is required`,
  'string.empty': ' Password field is not allowed to be empty',
  'string.email': 'name must be a valid email address',
  'string.min': 'Password must be at least {{#limit}} character long',
  'string.max':
    'Password length must be less than or equal to {{#limit}} character long',
};
const titleErrorMessage = {
  'any.required': `title is required`,
  'string.empty': ' title field is not allowed to be empty',
  'string.email': 'title must be a valid email address',
  'string.min': 'title must be at least {{#limit}} character long',
  'string.max':
    'title length must be less than or equal to {{#limit}} character long',
};
const bodyErrorMessage = {
  'any.required': `body is required`,
  'string.empty': ' body field is not allowed to be empty',
  'string.email': 'name must be a valid email address',
  'string.min': 'body must be at least {{#limit}} character long',
  'string.max':
    'body length must be less than or equal to {{#limit}} character long',
};

module.exports = {
  nameErrorMessage,
  emailErrorMessage,
  passwordErrorMessage,
  titleErrorMessage,
  bodyErrorMessage,
};
