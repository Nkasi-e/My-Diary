const { Router } = require('express');

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require('./userController');

const router = Router();

router.route('/').get(getUser).post(registerUser, loginUser).patch(updateUser);

module.exports = router;
