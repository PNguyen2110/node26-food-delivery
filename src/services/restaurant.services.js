const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findAll({
      // lấy toàn bộ
      // include: "userLikes"

      // chỉ lấy userLikes
      include: {
        association: "userLikes",
        through: {
          attributes: [],
        },
        // không lấy key email
        // attributes: {
        //   exclude: ["email", "password"],
        // },
      },

      // thêm key cần lấy
      // include: [
      //   "user",
      //   {
      //     association: "userLikes",
      //     through: {
      //       attributes: ["createdAt"],
      //     },
      //   },
      // ],
    });
    return restaurant;
  } catch (err) {
    throw err;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(restaurant.__proto__);

    // khi thiết lập relationship chocác model,
    // mặc định sequelize sẽ tạo ra các phương thức
    // cho model để tương tác với model khác
    const userLike = await restaurant.hasUserLike(user.id);
    if (userLike) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }
    return null;
  } catch (err) {
    throw err;
  }
};

const createRestaurant = async (data) => {
  try {
    const restaurant = Restaurant.create(data);
    return restaurant;
  } catch (err) {
    throw err;
  }
};

const deleteRestaurant = async (restaurantId, user) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    console.log("restaurant", restaurant);

    if (!restaurant) {
      throw new AppError("400", "restaurant not found");
    }
    if (restaurant.userId !== user.id) {
      throw new AppError("403", "no have permissions");
    }
    await Restaurant.destroy({ where: { id: restaurant.id } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getRestaurant,
  likeRestaurant,
  createRestaurant,
  deleteRestaurant,
};
