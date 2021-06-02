const express = require("express");
const {
  getAll,
  createProduct,
  getOneById,
  deleteOneById,
  updateOneById,
  updateStockById,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/products", getAll);
productRouter.get("/products/:id", getOneById);
productRouter.delete("/products/:id", deleteOneById);
productRouter.post("/products", createProduct);
productRouter.put("/products/:id", updateOneById);
productRouter.put("/products/stock/:id", updateStockById);

module.exports = productRouter;
