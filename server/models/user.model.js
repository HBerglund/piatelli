const mongoose = require("mongoose");
const { validateEmail, validatePhone } = require("./model.helpers");

const userSchema = new mongoose.Schema({
  role: {
    type: "String",
    required: [true, "role is required"],
    default: "customer",
    enum: {
      values: ["customer", "admin"],
      message: "'{VALUE}' is not a valid role",
    },
  },
  approvedAdmin: { type: "Boolean", default: false },
  fullName: { type: "String", required: true },
  email: {
    type: "String",
    required: true,
    lowercase: true,
    validate: [validateEmail, "invalid email"],
    trim: true,
  },
  phone: {
    type: "String",
    minLength: [10, "invalid phone number"],
    maxLength: [12, "invalid phone number"],
    validate: [validatePhone, "invalid phone number"],
  },
  street: { type: "String", required: true },
  zipcode: {
    type: "String",
    minLength: [5, "invalid zipcode"],
    maxLength: [5, "invalid zipcode"],
  },
  city: { type: "String", required: true },
  country: "String",
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
