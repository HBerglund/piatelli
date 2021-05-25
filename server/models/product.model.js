const mongoose = require("mongoose");
const { validateImgUrl } = require("./model.helpers");

const productSchema = new mongoose.Schema({
  category: { type: ["String"], required: true },
  name: { type: "String", required: true },
  price: { type: "Number", required: true },
  img: {
    type: "String",
    required: true,
    validate: [validateImgUrl, "invalid image url"],
  },
  description: {
    type: "String",
    required: true,
  },
  details: { type: "String", required: true },
  care: { type: "String", required: true },
  stock: { type: "Number", required: true },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
