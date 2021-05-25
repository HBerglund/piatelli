const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: "String",
    zip: "String",
    city: "String",
    country: "String",
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  email: "String",
  password: "String",
  role: "String",
  authorized: "Boolean",
  fullName: "String",
  phone: "String",
  address: addressSchema,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
