const { AppError } = require("../helpers/error");

const requireRole = (...roles) => {
  return (req, res, next) => {
    const { user } = res.locals;
    const isMatched = roles.includes(user.role);
    if (!isMatched) {
      next(new AppError(403, "no have permissions"));
    }
    next();
  };
};
module.exports = requireRole;
