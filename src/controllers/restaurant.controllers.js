const { response } = require("../helpers/response");
const restaurantServices = require("../services/restaurant.services");
const getRestaurant = () => {
  return async (req, res, next) => {
    try {
      const restaurant = await restaurantServices.getRestaurant();
      res.status(200).json(response(restaurant));
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};

// post localhost:4000/restaurant/:restaurantId/like
const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { restaurantId } = req.params;
      console.log("user", user);
      await restaurantServices.likeRestaurant(user.id, restaurantId);
      res.status(200).json("ok");
    } catch (err) {
      next(err);
    }
  };
};

const createRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      console.log("user2", user);
      const data = req.body;
      // set userId là người tạo nhà hàng đó
      data.userId = user.id;
      const restaurant = await restaurantServices.createRestaurant(data);
      res.status(200).json(response(restaurant));
    } catch (err) {
      next(err);
    }
  };
};

const deleteRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = res.locals;
      await restaurantServices.deleteRestaurant(id, user);
      res.status(201).json("ok");
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  getRestaurant,
  likeRestaurant,
  createRestaurant,
  deleteRestaurant,
};
