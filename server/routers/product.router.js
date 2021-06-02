const express = require("express");
const multer = require("multer");
const {
  getAll,
  createProduct,
  getOneById,
  deleteOneById,
  updateOneById,
  updateStockById,
  createImage,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/products", getAll);
productRouter.get("/products/:id", getOneById);
productRouter.delete("/products/:id", deleteOneById);
productRouter.post("/products", createProduct);
productRouter.put("/products/:id", updateOneById);
productRouter.put("/products/stock/:id", updateStockById);

module.exports = productRouter;
