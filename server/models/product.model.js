const mongoose = require("mongoose");
const runRegExValidation = require("../helpers/validation");

const productSchema = new mongoose.Schema({
  category: {
    type: ["String"],
    required: true,
    validate: {
      validator: (v) => runRegExValidation("category", v),
      message: "Please enter a valid product name",
    },
  },
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
    min: 0,
    validate: {
      validator: (v) => runRegExValidation("price", v),
      message: "Please enter a valid price",
    },
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
  stock: {
    type: "Number",
    required: true,
    min: 0,
    validate: {
      validator: (v) => runRegExValidation("stock", v),
      message: "Please enter a valid amount for stock",
    },
  },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
