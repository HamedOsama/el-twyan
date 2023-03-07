const Admin= require('../model/admin')
const ServerError = require("../utils/ErrorInterface");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { access_token: token } = req.cookies;
    if (!token) {
      return next(ServerError.badRequest(401, 'Please Login to access this resource'));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token)
    const user = await Admin.findOne({ _id: decodedData.id, tokens: token });
    if (!user) {
      console.log('error')
      return next(ServerError.badRequest(401, 'Please Login to access this resource'));
    }
    console.log('found')
    req.user = user

    next();
  }
  catch (e) {
    e.statusCode = 401;
    next(e);
  }
};


module.exports=auth

