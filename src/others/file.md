Null file path

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

// const allowedUpdate = ['email', 'password'];
// const updates = Object.keys(req.body);
// const isValidOperation = updates.every((update) =>
// allowedUpdate.includes(update)
// );
// if (!isValidOperation) {
// res.status(400).json({ error: 'Invalid updates!' });
// }

// try {
// updates.forEach((update) => (req.user[update] = req.body[update]));
// await req.user.save();

// res.send(req.user);
// } catch (error) {
// res.status(400).send();
// console.log(error);
// }
