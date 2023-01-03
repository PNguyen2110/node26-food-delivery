const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Restaurant", // tên model
    // định nghĩa
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
    },

    //options
    {
      tableName: "restaurants",

      // disabled createAt, updateAt
      timestamps: false,
      //bỏ qua password khi tìm kiếm record (user)
    }
  );
};
