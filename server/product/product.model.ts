const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: "String",
  category: ["String"],
  name: "String",
  price: "Number",
  img: "String",
  description: "String",
  details: "String",
  care: "String",
  stock: "Number",
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
