const ResponseError = require("../error/ResError");
const ProductModel = require("../models/product.model");

const getAll = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    throw new ResponseError(500, "Something went wrong...");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create({
      ...req.body,
    });
    res.status(201).json(product);
  } catch (err) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

module.exports = { getAll, createProduct };
