const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () => {
  return (req, res, next) => {
    const file = req.file;
    if (!file) {
      next(new AppError(400, "please upload file"));
    }
    const url = `http://localhost:4000/${file.path.replace(/\\/g, "/")}`;
    res.status(200).json(response(url));
  };
};

module.exports = { upload };
