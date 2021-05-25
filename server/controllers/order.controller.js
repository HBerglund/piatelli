const ResponseError = require("../error/ResError");
const {
  loggedInUser,
  userHaveAccess,
  userIsAdmin,
} = require("../helpers/authHelper");
const OrderModel = require("../models/order.model");

const getAll = async (req, res, next) => {
  if (userIsAdmin(req)) {
    const orders = await OrderModel.find({}).populate("customer");
    res.status(200).json(orders);
  } else {
    res
      .status(403)
      .json(
        "You need to be logged in and have admin rights for this request..."
      );
  }
};

const getOneById = async (req, res) => {
  const id = req.params.id;
  const orderToCheck = await OrderModel.findById(id);
  if (userIsAdmin(req) || (await userHaveAccess(req, orderToCheck.customer))) {
    const order = await OrderModel.findById(id).populate("customer");
    res.status(200).json(order);
  } else {
    res.status(403).json("You need to have admin rights to look at this order");
  }
};

const deleteOneByid = async (req, res) => {
  const id = req.params.id;
  if (userIsAdmin(req)) {
    const order = await OrderModel.findByIdAndDelete(id);
    res.status(200).json(order);
  } else {
    res.status(403).json("You don't have permission to delete this order");
  }
};

const createOrder = async (req, res) => {
  if (loggedInUser(req)) {
    const order = await OrderModel.create({
      ...req.body,
    });
    res.status(201).json(order);
  } else {
    res.status(403).json("You need to be logged in to place an order");
  }
};

const updateOneById = async (req, res) => {
  const id = req.params.id;
  const orderToCheck = await OrderModel.findById(id);
  if (userIsAdmin(req) || (await userHaveAccess(req, orderToCheck.customer))) {
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(order);
  } else {
    res.status(403).json("You don't have permission to update this order");
  }
};

module.exports = {
  getAll,
  getOneById,
  deleteOneByid,
  createOrder,
  updateOneById,
};
