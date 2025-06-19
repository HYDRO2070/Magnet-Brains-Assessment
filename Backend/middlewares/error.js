//is file ka code isliye use hoga kyuki hume poora stack error nhi chahiye hume bs kaam ki line chahiye
exports.generatedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key")
  ) {
    err.message = "User with this Email Address Already exists";
  }

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    // stack: err.stack
  });
};
