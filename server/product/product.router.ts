import express, { Request, Response } from "express";
import ResponseError from "../error/ResError";
import ProductModel from "./product.model";

const productRouter = express.Router();
// const productHandler = express.Router();

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    throw new ResponseError(404, "Couldn't find any data in file");
  }
};

productRouter.get("/products", getAll);

export default productRouter;
