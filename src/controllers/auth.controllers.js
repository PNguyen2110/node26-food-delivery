// post : /login
const { response } = require("../helpers/response");
const authServices = require("../services/auth.services");
const login = () => {
  return async (req, res, next) => {
    try {
      const credentials = req.body;
      const user = await authServices.login(credentials);
      res.status(200).json(response(user));
    } catch (err) {
      next(err);
    }
  };
};

const getProfiles = () => {
  return (req, res, next) => {
    try {
      const { user } = res.locals;
      res.status(200).json(response(user));
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  login,
  getProfiles,
};
