// set up sequelize
const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log(123);
  } catch (e) {
    console.log(e);
  }
})();

const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLike")(sequelize);

// định nghĩa mối quan hệ giữa các models
Restaurant.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurant", foreignKey: "userId" });

// sequelize.sync({ alter: true });

// định nghĩa relationship giữa các model

// user 1 - n Restaurant
Restaurant.belongsToMany(User, {
  as: "userLikes",
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});
User.belongsToMany(Restaurant, {
  as: "restaurantLikes",
  through: RestaurantLikes,
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  User,
  Restaurant,
};
