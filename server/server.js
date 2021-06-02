const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const orderRouter = require("./routers/order.router");
const deliveryRouter = require("./routers/delivery.router");
const cookieSession = require("cookie-session");
const imageRouter = require("./routers/image.router");

const app = express();
const PORT = 4000;
const url =
  "mongodb+srv://HermanBerglund:3BUH3K@vE6cu*eVAAk@Ti7wx@piattelli.ze7uc.mongodb.net/Piattelli?retryWrites=true&w=majority";

app.use(
  cookieSession({
    name: "session",
    secret: "sdg7df7gdiufgdg",
    secure: false,
    maxAge: 1000 * 1000,
    httpOnly: true,
  })
);

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(deliveryRouter);
app.use(imageRouter);

app.use((err, req, res, next) => {
  console.log(err);

  const errorCode = err.errorCode || err.status || 500;
  res.status(errorCode).json({
    errorCode: errorCode,
    messsage: err.message || "Something went wrong...",
  });
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
