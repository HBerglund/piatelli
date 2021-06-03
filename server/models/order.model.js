const mongoose = require("mongoose");
const runRegExValidation = require("../helpers/validation");
const ProductModel = require("./product.model");
const { addressSchema } = require("./user.model");

const deliverySchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => runRegExValidation("delivery name", v),
      message: "Please enter a valid delivery name",
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
  deliveryTime: {
    type: "String",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      require: true,
    },
    address: addressSchema,
    items: [ProductModel.schema],
    payment: "String",
    delivery: deliverySchema,
    sum: { type: "Number", required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
