const { Router } = require('express');
const authMiddleware = require('../middleware/authentication');

const { registerUser, loginUser, userProfile } = require('./userController');

const router = Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/myprofile').get(authMiddleware, userProfile);

module.exports = router;
