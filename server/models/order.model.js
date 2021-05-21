const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: "String",
  items: [String],
  date: "Date",
  payment: "String",
  delivery: "String", // addressSchema?
  sum: "Number",
});

// const addressSchema = new mongoose.Schema({
//   street: "String",
//   zip: "String",
//   city: "String",
//   country: "String",
// });

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
