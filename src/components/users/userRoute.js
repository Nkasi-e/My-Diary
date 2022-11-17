const { Router } = require('express');
const authMiddleware = require('../middleware/authentication');

const {
  registerUser,
  loginUser,
  userProfile,
  deleteAccount,
  userInfo,
  forgotPassword,
  resetPassword,
  linkMessage,
} = require('./userController');

const router = Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/myprofile').get(authMiddleware, userProfile);
router.route('/deleteaccount').post(authMiddleware, deleteAccount);
router.route('/userinfo/:token').get(userInfo);
router.route('/forgotpassword').post(forgotPassword);
router.route('/reset-password/:id/:token').post(resetPassword).get(linkMessage);

module.exports = router;
