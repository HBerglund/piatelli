const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: "String",
  password: { type: "String", select: false },
  role: "String",
  approvedAdmin: "Boolean",
  fullName: "String",
  phone: "String",
  street: "String",
  zipcode: "String",
  city: "String",
  country: "String",
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
