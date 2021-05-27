const DeliveryModel = require("../models/delivery.model");

const getAll = async (req, res) => {
  const delivery = await DeliveryModel.find({});
  res.status(200).json(delivery);
};

const createDeliveryOption = async (req, res) => {
  const delivery = await DeliveryModel.create({
    ...req.body,
  });
  res.status(201).json(delivery);
};

module.exports = { getAll, createDeliveryOption };
