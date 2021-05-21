const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: "String",
  zip: "String",
  city: "String",
  country: "String",
});

const AddressModel = mongoose.model("address", addressSchema);

module.exports = AddressModel;
