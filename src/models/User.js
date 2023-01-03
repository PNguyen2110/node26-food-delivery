const bcrypt = require("bcrypt");

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User", // tên model
    // định nghĩa
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
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      // confirmPassword: {},
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   // demo custom validatior
        //   isMatchedPassword: (value) => {
        //     // logic
        //     // nếu k thoả mãn thì throw new Error
        //     if (value !== this.confirmPassword) {
        //       throw new Error("ConfirmPassword is not matched");
        //     }
        //   },
        // },

        // sẽ được chạy trước khi create/updata
        set(value) {
          // không duoc075 lưu plaintext password trực tiếp xuống db
          // cần hash password bằng lib bcrypt
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      role: {
        type: DataTypes.ENUM("user", "merchant", "admin"),
        defaultValue: "user",
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },

    //options
    {
      tableName: "users",

      // disabled createAt, updateAt
      timestamps: false,
      //bỏ qua password khi tìm kiếm record (user)
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      hooks: {
        // xoá password trước khi trả về cho client
        afterSave: (record) => {
          delete record.dataValues.password;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
