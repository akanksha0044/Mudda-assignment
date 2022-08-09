const jwt = require('jsonwebtoken');
const User = require("../model/userschema");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });
    if (!rootUser) { throw new error('User not Found') }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized:No token provided');
    console.log(err);
  }
}

module.exports = authenticate;
