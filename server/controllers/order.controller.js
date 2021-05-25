const ResponseError = require("../error/ResError");
const {
  loggedInUser,
  userIsCustomer,
  userHaveAccess,
  userIsAdmin,
} = require("../helpers/authHelper");
const OrderModel = require("../models/order.model");

const getAll = async (req, res, next) => {
  if (userIsAdmin(req)) {
    const orders = await OrderModel.find({}).populate("customer");
    res.status(200).json(orders);
  } else {
    res.status(403).json("You need to have admin rights for this request...");
  }
};

const getOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id).populate("customer");
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
    if (loggedInUser(req)) {
      const order = await OrderModel.create({
        ...req.body,
      });
      res.status(201).json(order);
    }
  } catch (err) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const updateOneById = async (req, res) => {
  const id = req.params.id;
  const selectedOrder = await OrderModel.findById(id);
  if (userHaveAccess(req, selectedOrder.customer)) {
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(order);
  }
};

module.exports = {
  getAll,
  getOneById,
  deleteOneByid,
  createOrder,
  updateOneById,
};
