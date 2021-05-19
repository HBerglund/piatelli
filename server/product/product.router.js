const express = require("express");
const ResponseError = require("../error/ResError");
const ProductModel = require("./product.model");

const productRouter = express.Router();

const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    throw new ResponseError(404, "Couldn't find any data in file");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create({
      ...req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

productRouter.get("/products", getAll);
productRouter.post("/products", createProduct);

module.exports = productRouter;
