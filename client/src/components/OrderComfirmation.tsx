import { Box, Typography, makeStyles } from "@material-ui/core";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";
import { CartItem } from "./context/CartContext";
import { Delivery } from "../helpers/typings";

interface IProps {
  email: string | undefined;
  name: string | undefined;
  adress: string | undefined;
  phoneNumber: string | undefined;
  zipCode: string | undefined;
  country: string | undefined;
  city: string | undefined;
  payedProducts: CartItem[] | undefined;
  deliveryOption: Delivery | undefined;
  total: number | undefined;
}

function OrderComfirmation(props: IProps) {
  const classes = useStyles();

  function makeId(length: number) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const invoiceID = makeId(10);

  return (
    <Box>
      <Box mb={10} className={classes.textAlignCenterResponsive}>
        <Box mb={5}>
          <Typography variant="h6" className={classes.centerFlex}>
            Thank you for your purchase.
          </Typography>
        </Box>
        <Typography
          align={"center"}
          variant="body2"
          className={classes.centerFlex}
        >
          An email with more information has been send to {props.email}.
        </Typography>
        <Typography variant="body1" className={classes.centerFlex}>
          Invoice ID: {invoiceID}{" "}
        </Typography>
      </Box>
      <Box className={`${classes.centerFlex} ${classes.columnResponsive}`}>
        <Box>
          <Box className={`${classes.cartContentWrapper} ${classes.margin2}`}>
            {props.payedProducts!.map((product: CartItem, i) => (
              <Box key={i} className={`${classes.cartContent}`}>
                <Img
                  src={[product.preview, fallback]}
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
          </Box>
          <Box mb={5}>
            <Typography>
              Price: {props.total} kr + {props.deliveryOption?.name} shipping
              cost: ({props.deliveryOption?.price} kr)
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box ml={3} className={classes.margin2}>
            <Typography variant="h6">Customer:</Typography>
            <Typography>Name: {props.name}</Typography>
            <Typography>
              Address: {props.adress}, {props.zipCode} {props.city},{" "}
              {props.country}
            </Typography>
            <Typography>Phone number: {props.phoneNumber}</Typography>
          </Box>
          <Box className={classes.margin2}>
            {props.deliveryOption?.name === "Post Nord" ? (
              <Typography>
                Delivery method: <br /> Delivery to closest Postombud with Post
                Nord.
              </Typography>
            ) : null}
            {props.deliveryOption?.name === "Budbee home delivery" ? (
              <Typography>
                Delivery method: <br /> Home delivery with Budbee.
              </Typography>
            ) : null}
            {props.deliveryOption?.name === "Instabox" ? (
              <Typography>
                Delivery method: <br /> Delivery to closest Instabox.
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
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
