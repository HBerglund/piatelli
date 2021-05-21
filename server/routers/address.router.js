const express = require("express");
const { getAll, createAddress } = require("../controllers/address.controller");

const addressRouter = express.Router();

addressRouter.get("/address", getAll);
addressRouter.post("/address", createAddress);

module.exports = addressRouter;
