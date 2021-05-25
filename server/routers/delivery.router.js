const express = require("express");
const {
  getAll,
  createDelivery,
} = require("../controllers/delivery.controller");

const deliveryRouter = express.Router();

deliveryRouter.get("/orders", getAll);
deliveryRouter.post("/orders/", createDelivery);

module.exports = deliveryRouter;
