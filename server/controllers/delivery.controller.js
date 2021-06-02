const ResponseError = require("../error/ResError");
const DeliveryModel = require("../models/delivery.model");

const getAll = async (req, res) => {
  const delivery = await DeliveryModel.find({});
  if (delivery) {
    res.status(200).json(delivery);
  } else {
    throw new ResponseError(400, "Delivery options does not exist on database");
  }
};

const createDeliveryOption = async (req, res) => {
  if (userIsAdmin(req) || (await userHaveAccess(req, orderToCheck.customer))) {
    const delivery = await DeliveryModel.create({
      ...req.body,
    });
    if (delivery) {
      res.status(201).json(delivery);
    } else {
      throw new ResponseError(400, "Something went wrong...");
    }
  } else {
    throw new ResponseError(
      403,
      "You need to have admin rights to create a delivery option"
    );
  }
};

module.exports = { getAll, createDeliveryOption };
