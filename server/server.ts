import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import productRouter from "./product/product.router";

const app = express();
const PORT = 4000;
const url =
  "mongodb+srv://HermanBerglund:3BUH3K@vE6cu*eVAAk@Ti7wx@piattelli.ze7uc.mongodb.net/Piattelli?retryWrites=true&w=majority";

app.use(express.json());
app.use(productRouter);

app.use((err, req: Request, res: Response, next) => {
  console.log(err);
  res.status(500).json(err.message);
});

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

(async function run() {
  try {
    await mongoose.connect(url, connectionParams);
    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
  });
})();
