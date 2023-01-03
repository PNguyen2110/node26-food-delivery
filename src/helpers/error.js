class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// err là instance của AppError
const handleError = (err, req, res, next) => {
  // kiểm tra err có phải là instance của AppError hya k
  // nếu err là những lỗi của AppError, nghĩa là err đã biết và xử lí
  // nếu là những lỗi không phải là instance của AppError , thì có thể vì lí do nảo đó ch biết
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Internal Server");
  }

  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
  // gọi next( nếu có các middleware khác để đi tới middleware phía sau)
  next();
};

module.exports = {
  handleError,
  AppError,
};
