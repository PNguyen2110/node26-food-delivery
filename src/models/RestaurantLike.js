const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RestaurantLikes", // tên model
    // định nghĩa
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },

      restaurantId: {
        type: DataTypes.INTEGER,
        field: "restaurant_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },

    //options
    {
      tableName: "restaurants_likes",

      // disabled createAt, updateAt
      timestamps: false,
      //bỏ qua password khi tìm kiếm record (user)
    }
  );
};
