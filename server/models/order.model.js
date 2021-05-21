const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: "String",
  items: [String],
  date: "Date",
  payment: "String",
  delivery: "String",
  address: { type: mongoose.Schema.ObjectId, ref: "address", require: true },
  sum: "Number",
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
