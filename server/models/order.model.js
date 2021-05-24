const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: "String",
    zip: "String",
    city: "String",
    country: "String",
  }
  // { toJSON: { virtuals: true } }
);

// addressSchema.virtual("orders", {
//   ref: "order",
//   foreignField: "address",
//   localField: "_id",
// });

const orderSchema = new mongoose.Schema({
  customer: "String",
  items: [String],
  date: "Date",
  payment: "String",
  delivery: "String",
  address: [addressSchema],
  sum: "Number",
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
