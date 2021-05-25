const ResponseError = require("../error/ResError");
const DeliveryModel = require("../models/delivery.model");

const getAll = async (req, res, next) => {
  try {
    const delivery = await DeliveryModel.find({}).populate("order");
    res.status(200).json(delivery);
  } catch (error) {
    throw new ResponseError(404, "something went wrong...");
  }
};

const createDelivery = async (req, res) => {
  try {
    const delivery = await DeliveryModel.create({
      ...req.body,
    });
    res.status(201).json(address);
  } catch (err) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

module.exports = {
  getAll,
  createDelivery,
};
