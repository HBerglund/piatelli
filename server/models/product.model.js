const mongoose = require("mongoose");
const runRegExValidation = require("../helpers/validation");

const productSchema = new mongoose.Schema({
  category: { type: ["String"], required: true },
  name: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => runRegExValidation("product name", v),
      message: "Please enter a valid product name",
    },
  },
  price: {
    type: "Number",
    required: true,
  },
  img: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => runRegExValidation("image url", v),
      message: "Please enter a valid image url",
    },
  },
  description: {
    type: "String",
    required: true,
    minLength: [1, "Desciption can't be left blank"],
  },
  details: {
    type: "String",
    required: true,
    minLength: [1, "Details can't be left blank"],
  },
  care: {
    type: "String",
    required: true,
    minLength: [1, "Care can't be left blank"],
  },
  stock: { type: "Number", required: true },
  quantity: { type: "Number", required: false },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
