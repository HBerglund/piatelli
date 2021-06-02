const mongoose = require("mongoose");
const runRegExValidation = require("../helpers/validation");

const imageSchema = new mongoose.Schema({
  fieldname: "String",
  originalname: "String",
  encoding: "String",
  mimetype: "String",
  buffer: "Buffer",
  size: "Number",
});

const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
