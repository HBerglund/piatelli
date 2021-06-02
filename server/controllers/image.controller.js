const ResponseError = require("../error/ResError");
const ImageModel = require("../models/image.model");
const { userIsAdmin, userHaveAccess } = require("../helpers/authHelper");

const getAll = async (req, res) => {
  const images = await ImageModel.find({});
  if (images) {
    res.status(200).json(images);
  } else {
    throw new ResponseError(400, "Images does not exist on database");
  }
};

const createImage = async (req, res) => {
  if (userIsAdmin(req)) {
    const image = await ImageModel.create({
      ...req.body,
    });
    if (image) {
      res.status(201).json(image);
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

module.exports = { getAll, createImage };
