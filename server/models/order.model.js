const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => runRegExValidation("delivery name", v),
      message: "Please enter a valid delivery name",
    },
  },
  price: {
    type: "Number",
    required: true,
    min: 0,
    validate: {
      validator: (v) => runRegExValidation("price", v),
      message: "Please enter a valid price",
    },
  },
  deliveryTime: {
    type: "String",
    required: true,
  },
});

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
        validator: (v) => runRegExValidation("price", v),
        message: "Please enter a valid country name",
      },
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      require: true,
    },
    address: addressSchema,
    items: [String],
    payment: { type: "String", required: true },
    delivery: deliverySchema,
    sum: { type: "Number", required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
