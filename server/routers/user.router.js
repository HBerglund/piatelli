const express = require("express");

const {
  getAll,
  getOneById,
  deleteOneById,
  updateOneById,
  register,
  login,
  authenticate,
  logOut,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/users", getAll);
userRouter.get("/users/:id", getOneById);
userRouter.delete("/users/:id", deleteOneById);
userRouter.put("/users/:id", updateOneById);
userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.get("/users/authenticate", authenticate);
userRouter.delete("/users", logOut);

module.exports = userRouter;
