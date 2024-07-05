export const ErrorMiddleware = (err, req, res, next) => {
  if (!err) {
    err = new Error("Internal server error");
    err.statusCode = 500;
  }
  console.log("error middleware:",err)

  err.message = err?.message || "Internal server error";
  err.statusCode = err?.statusCode || 500;

  if (err.code === 11000) {
    err.message = "Duplicate key error";
    err.statusCode = 400;
  }

  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    success: false,
  });
};
