const express = require("express");
const { getUsers } = require("../../controllers/users.controllers");

// path usersRouter : /api/v1/users
const usersRouter = express.Router();

usersRouter.get("", getUsers);

module.exports = usersRouter;
