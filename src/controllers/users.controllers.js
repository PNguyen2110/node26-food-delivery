const { response } = require("../helpers/response");
const userService = require("../services/users.services");
// controllers nhận vào request, response
// nhiệm vụ: chỉ parse request (params,body) sau đó chuyển sang service xử lí,
// nhận kết quả trả về từ service và trả response về cho client

//c1
// const getUsers = async (req, res) => {
//   try {
//     const users = await userService.getUsers();
//     res.status(200).json({ data: users });
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// };
const userServices = require("../services/users.services");
// c2
const getUsers = () => {
  return async (req, res, next) => {
    try {
      const user = await userServices.getUsers();
      res.status(200).json(response(user));
    } catch (err) {
      // res.status(400).json({ error: err });
      // chuyển tiếp err xuống middleware handleError
      next(err);
    }
  };
};

// tạo user
const createUser = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const createUser = await userServices.createUser(user);
      res.status(200).json(response(user));
    } catch (err) {
      // res.status(500).json({ error: err.message });
      next(err);
    }
  };
};

// delete
const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      await userServices.deleteUser(id);
      res.status(200).json(response(true));
    } catch (err) {
      // res.status(500).json({ error: err.message });
      next(err);
    }
  };
};

// update
const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.body;
      await userServices.updateUser(user, id);
      res.status(200).json(response(user));
    } catch (err) {
      // res.status(500).json({ error: err.message });
      next(err);
    }
  };
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
