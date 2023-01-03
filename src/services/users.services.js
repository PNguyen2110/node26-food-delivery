const { User, Restaurant } = require("../models");
// services nhận data từ controller
// nhiệm vụ: xử lý nghiệp vụ của ứng dụng , sau đó gọi tới model của sequelize để query xuống db,
// nhận data từ db và return về cho controller
const getUsers = async () => {
  try {
    const users = await User.findAll({ include: "restaurant" });

    return users;
  } catch (err) {
    throw err;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({ where: { email: data.email } });
    // check email đã tồn tại
    if (user) {
      throw new AppError(400, "Email is exists");
      // throw error chạy xuống throw ở catch {}
    }
    // ví dụ trường hợp admin thêm user bằng email
    // ta tạo 1 password ngẫu nhiên gửi về email user
    if (!data.password) {
      const pass = Math.random().toString(36).substring(2);
      // gửi email về cho user + pass
    }

    const createUser = await User.create(data);
    return createUser;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError(400, "User not found");
    }
    await User.destroy({ where: { id: userId } });
  } catch (err) {
    throw err;
  }
};

const updateUser = async (data, id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    await User.update(data, { where: { id: id } });
    await User.findOne({ where: { id: id } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
