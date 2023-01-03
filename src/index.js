const express = require("express");
const { handleError, AppError } = require("./helpers/error");
const authorization = require("./middleware/authorization");

const { sequelize } = require("./models");

const app = express();

app.use(express.json());
app.use(express.static("."));

//Sync model của sequelize với db(app start chạy cậu lệnh phiá dưới)
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
app.use("/api/v1", v1);

// demo auth
// app.get("/auth", authorization, async (req, res, next) => {
//   try {
//     const { user } = res.locals;
//     res.status(200).json(user);
//   } catch (err) {
//     next();
//   }
// });
// handleError;
//demo handleError
app.get("/error", (req, res, next) => {
  throw new AppError(500, "Internal Server");

  // or next(req, res, next)
});

// middleware đc dùng đẻ bắt và xử lí lỗi ra cho client
// phải đc bên dưới các routers
// app.use((err, req, res , next) => {})
app.use(handleError);

app.listen(4000);
