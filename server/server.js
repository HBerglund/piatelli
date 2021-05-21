const express = require("express");
const mongoose = require("mongoose");
const ResponseError = require("./error/ResError");
const orderRouter = require("./routers/order.router");
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
require("express-async-errors");

const app = express();
const PORT = 4000;
const url =
  "mongodb+srv://HermanBerglund:3BUH3K@vE6cu*eVAAk@Ti7wx@piattelli.ze7uc.mongodb.net/Piattelli?retryWrites=true&w=majority";

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({ errorCode: statusCode, message: err.message });
});

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
