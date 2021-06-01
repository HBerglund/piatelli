import { Box, Typography, makeStyles } from "@material-ui/core";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";
import { CartItem } from "./context/CartContext";
import { Delivery, Order, Product } from "../helpers/typings";
import { Children, useContext, useEffect, useState } from "react";
import { OrderContext } from "./context/OrderContext";
import ErrorBoundary from "./ErrorBoundary";

function OrderComfirmation() {
  const classes = useStyles();
  const orderContext = useContext(OrderContext);

  const [latestOrder, setLatestOrder] = useState<Order>();

  useEffect(() => {
    fetchLatestOrder();
  }, [orderContext.latestOrderId]);

  const fetchLatestOrder = () => {
    console.log("im in the fetch");
    fetch(`/orders/${orderContext.latestOrderId}`, {
      method: "GET",
      credentials: "include",
    }).then((res) =>
      res.json().then((result) => {
        if (result.errorCode) {
          console.log({ result });
        } else {
          setLatestOrder(result);
        }
      })
    );
  };

  if (latestOrder) {
    return (
      <Box>
        <Box mb={10} className={classes.textAlignCenterResponsive}>
          <Box mb={5}>
            <Typography variant="h6" className={classes.centerFlex}>
              Thank you for your purchase.
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.centerFlex}>
            Order ID: {latestOrder._id}
          </Typography>
        </Box>
        <Box className={`${classes.centerFlex} ${classes.columnResponsive}`}>
          <Box>
            <Box className={`${classes.cartContentWrapper} ${classes.margin2}`}>
              {latestOrder.items.map((product: Product, i) => (
                <Box key={i} className={`${classes.cartContent}`}>
                  <Img
                    src={[product.img, fallback]}
                    width="100rem"
                    height="100rem"
                  />
                  <div className={classes.productInfo}>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body1">x{product.quantity}</Typography>
                    <Typography variant="body2">
                      Price: {product.price}&nbsp;kr
                    </Typography>
                  </div>
                </Box>
              ))}
              <Box mb={5}>
                <Typography>Total price: ${latestOrder.sum}</Typography>
              </Box>
              <Box>
                <Box className={classes.margin2}>
                  {latestOrder.delivery?.name === "Post Nord" ? (
                    <Typography>
                      Delivery method: <br /> Delivery to closest Postombud with
                      Post Nord.
                    </Typography>
                  ) : null}
                  {latestOrder.delivery?.name === "Budbee home delivery" ? (
                    <Typography>
                      Delivery method: <br /> Home delivery with Budbee.
                    </Typography>
                  ) : null}
                  {latestOrder.delivery?.name === "Instabox" ? (
                    <Typography>
                      Delivery method: <br /> Delivery to closest Instabox.
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else return <div>HEJ</div>;
}

const useStyles = makeStyles((theme) => ({
  centerFlex: {
    display: "flex",
    justifyContent: "center",
  },
  textAlignCenterResponsive: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      padding: "0.3rem",
    },
  },
  columnResponsive: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      padding: "1rem",
    },
  },
  cartContentWrapper: {
    overflow: "auto",
    height: "25rem",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      border: " 4px solid transparent",
      borderRadius: "8px",
      backgroundClip: "padding-box",
    },
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cartContent: {
    margin: "1rem 0rem",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      margin: "1rem 0rem",
    },
  },
  productInfo: {
    marginLeft: "1rem",
  },
  margin2: {
    marginLeft: "1rem",
    [theme.breakpoints.down("xs")]: {
      margin: "2rem 0rem",
    },
  },
}));

export default OrderComfirmation;
