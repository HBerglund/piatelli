import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { ShoppingCart as CartIcon } from "@material-ui/icons";
import { CartContext, CartItem } from "./context/CartContext";
import { useContext } from "react";
import GroupedButtons from "./CartIncrementer";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";
import { Link } from "react-router-dom";

interface IProps {
  isVisible: boolean;
  onHide: () => void;
}

function Cart(props: IProps) {
  const { cart } = useContext(CartContext);
  const classes = useStyles();

  const total = cart.reduce(
    (ack: number, item) => ack + item.quantity * item.price,
    0
  );

  return (
    <>
      {props.isVisible ? (
        <Box
          className={`animate__animated animate__slideInRight ${classes.rootStyle}`}
        >
          <Box className={classes.topContent}>
            <CloseIcon onClick={props.onHide}></CloseIcon>
            <Typography variant="body1">Your Items</Typography>
            <CartIcon />
          </Box>
          <Box className={classes.cartWrapper}>
            {cart.map((product: CartItem, i) => (
              <Box key={i} className={classes.cartItems}>
                <Link to={`/producimgoduct.name}`}>
                  <Img
                    src={[product.imgUrl, fallback]}
                    width="100rem"
                    height="100rem"
                  />
                </Link>
                <div className={classes.cartItemDetail}>
                  <span>{product.name}</span>
                  <span>Price: {product.price}&nbsp;kr</span>
                  <GroupedButtons product={product} />
                </div>
              </Box>
            ))}
          </Box>
          <Box className={classes.bottomContentWrapper}>
            <Box className={classes.bottomContent}>
              <Typography className={classes.keepLeft} variant="h6">
                Total: {total}&nbsp;kr
              </Typography>
              <Button
                className={classes.keepRight}
                variant="contained"
                size={"small"}
              >
                <Link to="/checkout" color="inherit">
                  Checkout
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    position: "fixed",
    width: "20rem",
    top: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    margin: "0.2rem",
    [theme.breakpoints.down("xs")]: {
      width: "98.5%",
    },
  },
  topContent: {
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem 1rem",
    borderBottom: "solid 1px black",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  bottomContentWrapper: {
    bottom: 0,
    borderTop: "solid 1px black",
    margin: "1rem 1rem",
    paddingTop: "1rem",
  },
  keepLeft: {
    left: 0,
  },
  keepRight: {
    right: 0,
  },
  cartItems: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "2rem",
    // padding: "0.5rem",
  },
  cartItemDetail: {
    width: "34%",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  cartWrapper: {
    height: "30rem",
    overflow: "auto",
    marginRight: "0.5rem",
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
  },
}));

export default Cart;
