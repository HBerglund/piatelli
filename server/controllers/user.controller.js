const ResponseError = require("../error/ResError");
const UserModel = require("../models/user.model");

const getAll = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    throw new ResponseError(404, "something went wrong...");
  }
};

const getOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const deleteOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const updateOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(user);
    a;
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

const register = async (req, res) => {
  // CHECK FOR VALIDATION ERRORS
  const user = new UserModel({ ...req.body });
  let valErr = user.validateSync();
  if (valErr) {
    const errMsgs = [];
    for (const err of Object.values(valErr.errors)) {
      errMsgs.push(err.message);
    }
    res.status(400).json(errMsgs);
    return;
  }
  // OTHERWISE CREATE DOCUMENT
  const newUser = await UserModel.create({ ...req.body });
  res.status(201).json(newUser);
};

const login = async (req, res) => {};
const authenticate = async (req, res) => {};
const logOut = async (req, res) => {};

module.exports = {
  getAll,
  getOneById,
  deleteOneById,
  updateOneById,
  register,
  login,
  authenticate,
  logOut,
};
