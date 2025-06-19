exports.sendtoken = (user, statuscode, res) => {
  const token = user.getJwtToken(); // ✅ Corrected method name

  const expiresInHours = process.env.EXPIRES_JWT || 6;

  const options = {
    expires: new Date(Date.now() + expiresInHours * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true, // use only in production with HTTPS
  };

  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    id: user._id,
    token,
  });
};
