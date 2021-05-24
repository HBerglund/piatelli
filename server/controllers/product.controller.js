const ResponseError = require("../error/ResError");
const ProductModel = require("../models/product.model");

const getAll = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    throw new ResponseError(404, "something went wrong...");
  }
};

const getOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const deleteOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const createProduct = async (req, res, next) => {
  const newProduct = await ProductModel.create(req.body);
  res.status(201).json(newProduct);
};

const updateOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

module.exports = {
  getAll,
  getOneById,
  deleteOneById,
  createProduct,
  updateOneById,
};
