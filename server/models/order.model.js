const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: "String",
  price: "Number",
  deliveryTime: "String",
});

const addressSchema = new mongoose.Schema(
  {
    street: "String",
    zip: "String",
    city: "String",
    country: "String",
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: true,
  },
  address: addressSchema,
  items: [String],
  date: "Date",
  payment: "String",
  delivery: deliverySchema,
  sum: "Number",
});

// orderSchema.virtual(
//   "users",
//   {
//     ref: "user",
//     foreignField: "fullName",
//     localField: "customer",
//   },
//   { toJSON: { virtuals: true } }
// );

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
