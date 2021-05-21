const express = require("express");
const {
  getAll,
  getOneById,
  deleteOneByid,
  createOrder,
  updateOneById,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.get("/orders", getAll);
orderRouter.get("/orders/:id", getOneById);
orderRouter.delete("/orders/:id", deleteOneByid);
orderRouter.post("/orders/", createOrder);
orderRouter.put("/orders/:id", updateOneById);

module.exports = orderRouter;
