const express = require("express");
const ResponseError = require("../error/ResError");
const ProductModel = require("../models/product.model");
const { getAll, createProduct } = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/products", getAll);
productRouter.post("/products", createProduct);

module.exports = productRouter;
