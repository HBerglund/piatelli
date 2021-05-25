const ResponseError = require("../error/ResError");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { isBreakOrContinueStatement } = require("typescript");

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
  const { password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if email is already registered
  const users = await UserModel.find({});
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res
      .status(500)
      .json({ message: "User already exist", status: res.statusCode });
  }

  const user = await UserModel.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const users = await UserModel.find({}).select("+password");

  const user = users.find((user) => user.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      status: res.statusCode,
      message: "Wrong username or password",
    });
    return;
  }

  req.session.user = user;

  res.status(201).json(`Successfully logged in ${user.fullName}`);
};

const authenticate = async (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      authenticated: true,
      user: req.session.user,
    });
    return;
  }
  res.status(400).json({ authenticated: false });
};

const logOut = async (req, res) => {
  req.session = null;
  res.status(200).json("You're logged out!");
};

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
