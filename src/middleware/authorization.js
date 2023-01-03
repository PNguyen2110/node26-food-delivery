const jwt = require("jsonwebtoken");
const { AppError } = require("../helpers/error");
const { User } = require("../models");

const extractTokenFromHeader = (headers) => {
  const bearerToken = headers.authorization;
  const parts = bearerToken.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
    throw new AppError(401, "Invalid  token");
  }
  return parts[1];
};

const authorization = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const payload = jwt.verify(token, "node26-token");
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw new AppError(401, "invalid token");
    }

    // lưu trữ thông tin user vào request
    //để có thể truy cập vào middleware hoặc controllers tiếp theo

    res.locals.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, "Invalid token"));
    }
    next(err);
  }
};

module.exports = authorization;
