const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: "String",
    zip: "String",
    city: "String",
    country: "String",
  },
  { toJSON: { virtuals: true } }
);

addressSchema.virtual("orders", {
  ref: "order",
  foreignField: "address",
  localField: "_id",
});

const AddressModel = mongoose.model("address", addressSchema);

module.exports = AddressModel;
