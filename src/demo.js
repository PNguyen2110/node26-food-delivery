const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();

app.use(express.json());

// tạo kết nối db bằng sequelize

const sequelize = new Sequelize("node26-food", "root", "1234", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});
// kiểm tra kết nối xem có thành công haykhông

sequelize
  .authenticate()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log("failed");
    throw err;
  });

// tạo model để sequelize kết nối với table để thực hiện thêm, xửa, xoá, update

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    // disabled createAt, updateAt
    timestamps: false,
  }
);

app.get("/api/v1/users", async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(4000);
