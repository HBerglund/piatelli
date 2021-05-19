import express from "express";
import { Request, Response } from "express";
import ResponseError from "../error/ResError";
import ProductModel from "./product.model";

const productRouter = express.Router();

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    throw new ResponseError(404, "Couldn't find any data in file");
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create({
      ...req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    throw new ResponseError(404, "Something went wrong...");
  }
};

productRouter.get("/products", getAll);
productRouter.post("/products", createProduct);

export default productRouter;
