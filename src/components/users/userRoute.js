const { Router } = require('express');

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require('./userController');

const router = Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
