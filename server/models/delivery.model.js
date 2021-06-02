const mongoose = require("mongoose");
const runRegExValidation = require("../helpers/validation");

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

const DeliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = DeliveryModel;
