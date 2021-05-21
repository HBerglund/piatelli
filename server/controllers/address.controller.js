const ResponseError = require("../error/ResError");
const AddressModel = require("../models/address.model");

const getAll = async (req, res, next) => {
  try {
    const address = await AddressModel.find({});
    res.status(200).json(address);
  } catch (error) {
    throw new ResponseError(404, "something went wrong...");
  }
};

const createAddress = async (req, res) => {
  try {
    const address = await AddressModel.create({
      ...req.body,
    });
    res.status(201).json(address);
  } catch (err) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

module.exports = {
  getAll,
  createAddress,
};
