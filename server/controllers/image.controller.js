const ResponseError = require("../error/ResError");
const ImageModel = require("../models/image.model");
const { userIsAdmin, userHaveAccess } = require("../helpers/authHelper");

const getImage = async (req, res) => {
  const image = await ImageModel.findById(req.params.id);
  if (image) {
    res.set("Content-Type", image.mimetype);
    res.status(200).send(image.buffer);
  } else {
    throw new ResponseError(400, "Images does not exist on database");
  }
};

const createImage = async (req, res) => {
  console.log(req.file);
  if (userIsAdmin(req)) {
    const image = await ImageModel.create(req.file);
    if (image) {
      res.status(201).json(image._id);
    } else {
      throw new ResponseError(400, "Something went wrong...");
    }
  } else {
    throw new ResponseError(
      403,
      "You need to have admin rights to create a image"
    );
  }
};

module.exports = { getImage, createImage };
