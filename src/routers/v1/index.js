const express = require("express");
const { login, getProfiles } = require("../../controllers/auth.controllers");
const {
  getRestaurant,
  likeRestaurant,
  createRestaurant,
  deleteRestaurant,
} = require("../../controllers/restaurant.controllers");
const uploadControllers = require("../../controllers/upload.controllers");
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/users.controllers");
const authorization = require("../../middleware/authorization");
const requireRole = require("../../middleware/requireRole");
const uploads = require("../../middleware/uploads");

// path v1Router: /api/v1
const v1 = express.Router();

// định nghĩa các routers cho users
v1.get("/users", getUsers());
v1.post("/users", createUser());
v1.delete("/users/:id", deleteUser());
v1.put("/users/:id", updateUser());

// restaurants
v1.get("/restaurants", getRestaurant());
v1.post("/restaurants/:restaurantId/like", authorization, likeRestaurant());
v1.post(
  "/restaurants",
  authorization,
  requireRole("merchant", "admin"),
  createRestaurant()
);
v1.delete("/restaurants/:id", authorization, deleteRestaurant());
// auth
v1.post("/login", login());
v1.get("/profiles", authorization, getProfiles());

// upload

v1.post("/uploads", uploads.single("file"), uploadControllers.upload());

module.exports = v1;
