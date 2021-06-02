const ResponseError = require("../error/ResError");
const { userIsAdmin, loggedInUser } = require("../helpers/authHelper");
const ProductModel = require("../models/product.model");

const getAll = async (req, res, next) => {
  const products = await ProductModel.find({});
  res.status(200).json(products);
};

const getOneById = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    throw new ResponseError(400, "The product doesn't exist.");
  }
};

const deleteOneById = async (req, res) => {
  const id = req.params.id;
  if (userIsAdmin(req)) {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw new ResponseError(400, "The product doesn't exist in the database");
    }
    res.status(200).json(product);
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to perform this request"
    );
  }
};

const createProduct = async (req, res, next) => {
  if (userIsAdmin(req)) {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to perform this request"
    );
  }
};

const updateOneById = async (req, res) => {
  const id = req.params.id;
  if (userIsAdmin(req)) {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!product) {
      throw new ResponseError(400, "The product doesn't exist in the database");
    }
    res.status(200).json(product);
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to perform this request"
    );
  }
};

const updateStockById = async (req, res) => {
  const id = req.params.id;
  if (loggedInUser(req)) {
    const productToUpdate = await ProductModel.findById(id);
    const updatedStock = updateStock(productToUpdate.stock);

    if (updatedStock < 0) {
      res.status(200).json(productToUpdate);
    } else {
      const product = await ProductModel.findByIdAndUpdate(
        id,
        { stock: updatedStock },
        { new: true }
      );
      if (!product) {
        throw new ResponseError(
          400,
          "The product doesn't exist in the database"
        );
      }
      res.status(200).json(product);
    }
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to perform this request"
    );
  }
};

//update stock helper

function updateStock(currentStock) {
  return currentStock - 1;
}

module.exports = {
  getAll,
  getOneById,
  deleteOneById,
  createProduct,
  updateOneById,
  updateStockById,
};
