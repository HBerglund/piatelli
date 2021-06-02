const mongoose = require("mongoose");
const runRegExValidation = require("../helpers/validation");

const imageSchema = new mongoose.Schema({
  img: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => runRegExValidation("image url", v),
      message: "Please enter a valid image url",
    },
  },
});

const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
