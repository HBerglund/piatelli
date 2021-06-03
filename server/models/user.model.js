const mongoose = require("mongoose");
const { removeWhiteSpace } = require("./model.helpers");
const runRegExValidation = require("../helpers/validation");

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: "String",
      required: true,
      validate: {
        validator: (v) => runRegExValidation("street", v),
        message: "Please enter a valid street name",
      },
    },
    zipcode: {
      type: "String",
      set: (zip) => removeWhiteSpace(zip),
      required: true,
      validate: {
        validator: (v) => runRegExValidation("zipcode", v),
        message: "Please enter a valid zipcode",
      },
    },
    city: {
      type: "String",
      required: true,
      validate: {
        validator: (v) => runRegExValidation("city", v),
        message: "Please enter a valid city name",
      },
    },
    country: {
      type: "String",
      required: true,
      validate: {
        validator: (v) => runRegExValidation("country", v),
        message: "Please enter a valid country name",
      },
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
    lowercase: true,
    validate: {
      validator: (v) => runRegExValidation("email", v),
      message: "Please enter a valid email",
    },
    trim: true,
    set: (email) => email.toLowerCase(),
    unique: true,
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
  fullName: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => runRegExValidation("fullName", v),
      message: "Please enter a valid name",
    },
  },
  address: addressSchema,
  phone: {
    type: "String",
    validate: {
      validator: (v) => runRegExValidation("phone", v),
      message: "Please enter a valid phone number",
    },
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel, addressSchema };
