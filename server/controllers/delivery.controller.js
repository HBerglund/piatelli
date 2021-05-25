const DeliveryModel = require("../models/delivery.model");

const getAll = async (req, res, next) => {
  const delivery = await DeliveryModel.find({}).populate("order");
  res.status(200).json(delivery);
};

//Is this function needed? Should be hardcoded?

const createDelivery = async (req, res) => {
  const delivery = await DeliveryModel.create({
    ...req.body,
  });
  res.status(201).json(address);
};

module.exports = {
  getAll,
  createDelivery,
};
