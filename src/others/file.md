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
