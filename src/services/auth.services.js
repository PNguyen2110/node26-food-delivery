const { User } = require("../models");
const bcrypt = require("bcrypt");
const { AppError } = require("../helpers/error");
const { generateToken } = require("../helpers/jwt");

const login = async (credentials) => {
  try {
    const { password, email } = credentials;
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });
    if (!user) {
      throw new AppError(400, "Email or password invalid");
    }
    const isMatched = bcrypt.compareSync(password, user.password);
    console.log(isMatched);
    if (!isMatched) {
      throw new AppError(400, "Email or password invalid");
    }
    delete user.dataValues.password;

    return generateToken(user);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  login,
};
