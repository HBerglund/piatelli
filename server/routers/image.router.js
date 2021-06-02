const express = require("express");
const { getAll, createImage } = require("../controllers/image.controller");

const imageRouter = express.Router();

imageRouter.get("/image", getAll);
imageRouter.post("/image", createImage);

module.exports = imageRouter;
