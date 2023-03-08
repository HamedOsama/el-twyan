const Admin = require('../model/admin')
const ServerError = require("../utils/ErrorInterface");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const { access_token: token } = req.cookies;
    if (!token) {
      return next(ServerError.badRequest(401, 'Please Login to access this resource'));
    }

    const decodedData = jwt.verify(token, "PROJECT");
    
    const user = await Admin.findOne({ _id: decodedData._id, tokens: token });
    if (!user) {
      // console.log('error')
      return next(ServerError.badRequest(401, 'Invalid token'));
    }
    // console.log('found')
    req.admin = user

    next();
  }
  catch (e) {
    e.statusCode = 401;
    next(e);
  }
};


module.exports = auth

