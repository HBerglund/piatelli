const express = require("express");
const {
  getAll,
  createDeliveryOption,
} = require("../controllers/delivery.controller");

const deliveryRouter = express.Router();

deliveryRouter.get("/delivery", getAll);
deliveryRouter.post("/delivery", createDeliveryOption);

module.exports = deliveryRouter;
