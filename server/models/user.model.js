const mongoose = require("mongoose");
const {
  validateEmail,
  validatePhone,
  removeWhiteSpace,
} = require("./model.helpers");

const addressSchema = new mongoose.Schema(
  {
    street: { type: "String", required: true },
    zipcode: {
      type: "String",
      minLength: [5, "invalid zipcode"],
      maxLength: [5, "invalid zipcode"],
      set: (zip) => removeWhiteSpace(zip),
    },
    city: { type: "String", required: true },
    country: "String",
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
    lowercase: true,
    validate: [validateEmail, "invalid email"],
    trim: true,
    set: (email) => email.toLowerCase(),
  },
  password: {
    type: "String",
    required: true,
    minLength: [5, "password must be at least 6 characters"],
  },
  role: {
    type: "String",
    required: [true, "role is required"],
    default: "customer",
    enum: {
      values: ["customer", "admin"],
      message: "'{VALUE}' is not a valid role",
    },
  },
  authorizedAdmin: { type: "Boolean", default: false },
  fullName: { type: "String", required: true },
  address: addressSchema,
  phone: {
    type: "String",
    validate: [validatePhone, "invalid phone number"],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
