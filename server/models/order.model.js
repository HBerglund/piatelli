const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: "String",
  price: "Number",
  deliveryTime: "String",
});

const addressSchema = new mongoose.Schema(
  {
    street: "String",
    zipcode: "String",
    city: "String",
    country: "String",
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      require: true,
    },
    address: addressSchema,
    items: [String],
    payment: "String",
    delivery: deliverySchema,
    sum: "Number",
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
