const express = require("express");
const { getImage, createImage } = require("../controllers/image.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const imageRouter = express.Router();

imageRouter.get("/image/:id", getImage);
imageRouter.post("/image/", upload.single("img"), createImage);

module.exports = imageRouter;
