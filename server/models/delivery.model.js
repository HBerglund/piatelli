const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  name: "String",
  price: "Number",
  deliveryTime: "String",
});

const DeliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = DeliveryModel;
