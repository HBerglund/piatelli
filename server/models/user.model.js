const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: "String",
  approvedAdmin: "Boolean",
  fullName: "String",
  email: "String",
  phone: "String",
  street: "String",
  zipcode: "String",
  city: "String",
  country: "String",
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
