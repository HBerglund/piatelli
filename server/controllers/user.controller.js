const UserModel = require("../models/user.model");
const {
  loggedInUser,
  userHaveAccess,
  userIsAdmin,
} = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const ResponseError = require("../error/ResError");

const getAll = async (req, res) => {
  if (userIsAdmin(req)) {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to perform this request"
    );
  }
};

const getOneById = async (req, res) => {
  const id = req.params.id;
  const userToCheck = await UserModel.findById(id);
  if (userIsAdmin(req) || (await userHaveAccess(req, userToCheck._id))) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ResponseError(404, "User does not exist on database");
    }
    res.status(200).json(user);
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to perform this request"
    );
  }
};

const deleteOneById = async (req, res) => {
  const id = req.params.id;
  const userToCheck = await UserModel.findById(id);
  if (userIsAdmin(req) || (await userHaveAccess(req, userToCheck._id))) {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
    if (!user) {
      throw new ResponseError(404, "User does not exist on database");
    }
  } else {
    throw new ResponseError(
      403,
      "You don't have permission to delete this user"
    );
  }
};

const updateOneById = async (req, res) => {
  const id = req.params.id;
  const userToCheck = await UserModel.findById(id);
  if (userIsAdmin(req) || (await userHaveAccess(req, userToCheck._id))) {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!user) {
      throw new ResponseError(404, "User does not exist on database");
    }
    res.status(200).json(user);
  } else {
    res.status(403).json({
      user: user,
      message: "You don't have permission to perform this request",
    });
  }
};

const register = async (req, res) => {
  const { password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if email is already registered
  const users = await UserModel.find({});
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new ResponseError(409, "User already exist");
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
    throw new ResponseError(401, "Wrong username or password");
  }

  req.session.user = user;
  res
    .status(201)
    .json({ message: `Successfully logged in ${user.fullName}`, user: user });
};

const authenticate = async (req, res) => {
  if (loggedInUser(req)) {
    res.status(200).json({
      user: req.session.user,
    });
    return;
  }
  throw new ResponseError(400, "No user is logged in");
};

const logOut = async (req, res) => {
  if (loggedInUser(req)) {
    req.session = null;
    res.status(200).json("You're logged out!");
  } else {
    throw new ResponseError(400, "You're already logged out");
  }
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
