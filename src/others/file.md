Null file path

// User.beforeCreate(async function () {
// const user = this;
// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(user.password, salt);
// });
// // Hook for comparing password
// User.prototype.comparePassword = async function (candidatePassword) {
// const user = this;
// const isMatch = await bcrypt.compare(candidatePassword, user.password);
// return isMatch;
// };

// // Creating json web token
// User.prototype.createJWT = function () {
// const user = this;
// return jwt.sign(
// { userId: user.id, email: user.email },
// process.env.JWT_SECRET,
// {
// expiresIn: process.env.JWT_LIFETIME,
// }
// );
// };

// AUTHENTICATION

async function authorization(req, res, next) {
try {
const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(StatusCodes.UNAUTHORIZED);
      res.json({ message: 'invalid user token' });
      throw new Error('invalid user id');
    }
    const token = authHeader.split(' ')[1];
    //  verifying user token
    const payLoad = jwt.verify(token, process.env.JWT_SECRETE);
    const { userid, username } = payLoad;
    const user = { userid, username };

    // creating user object
    req.user = user;
    next();

} catch (error) {
if (error.name === 'JsonWebTokenError') {
res.status(StatusCodes.UNAUTHORIZED);
res.json({ message: ' invalid user token' });
} else {
res.status(StatusCodes.INTERNAL_SERVER_ERROR);
res.json({ message: 'Something went wrong' });
}
}
}

module.exports = authorization;
