// Create Token and saving in cookie

const sendToken = async(user, statusCode, res) => {
  const token = await user.generateToken();
  // console.log(token)

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    path : '/',
    domain: 'tawyanoffice.com', 
    sameSite : 'lax',
  };
  user.tokens = null
  user.password = null
  res.status(statusCode).cookie("access_token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;