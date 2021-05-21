const ResponseError = require("../error/ResError");
const OrderModel = require("../models/order.model");

const getAll = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({}).populate("address");
    res.status(200).json(orders);
  } catch (error) {
    throw new ResponseError(404, "something went wrong...");
  }
};

const getOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id);
    res.status(200).json(order);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const deleteOneByid = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await OrderModel.create({
      ...req.body,
    });
    res.status(201).json(order);
  } catch (err) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const updateOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

module.exports = {
  getAll,
  getOneById,
  deleteOneByid,
  createOrder,
  updateOneById,
};
