import {
  Box,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import swishLogo from "../assets/swish.png";
import cardLogo from "../assets/card.png";
import { Delivery } from "../helpers/typings";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "./context/UsersContext";
import runRegExValidation from "../helpers/validation";
interface IProps {
  setError: (err: boolean) => void;
  deliveryOption: Delivery | undefined;
  setPaymentOption: (value: string) => void;
  setSwishNumber: (value: string) => void;
  setNameOnCard: (value: string) => void;
  setCardNumber: (value: string) => void;
  setCvcNumber: (value: string) => void;
  setGiftCard: (value: string) => void;
  paymentOption: string | undefined;
  detailsAreMissing: () => boolean;

  total: number;
  clearValues: () => void;
  isLoading: boolean;
}

function PaymentMethod(props: IProps) {
  const classes = useStyles();
  const usersContext = useContext(UsersContext);

  const [fieldErr, setFieldErr] = useState<string[]>([]);

  useEffect(() => {
    props.setError(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldHaveError = fieldErr.length || !props.paymentOption;

  useEffect(() => {
    if (shouldHaveError) {
      props.setError(true);
    } else {
      props.setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.paymentOption]);

  const removeFieldErr = (name: string) => {
    setFieldErr((prev) =>
      prev.reduce((ack, item) => {
        if (item === name) {
          return ack;
        } else {
          return [...ack, item];
        }
      }, [] as string[])
    );
  };

  const getErrorMsg = (name: string) => {
    let errMsg: string | null = null;
    fieldErr.forEach((fieldName) => {
      if (fieldName === name) {
        name === "fullName"
          ? (errMsg = "Please enter a valid full name")
          : (errMsg = "Please enter a valid " + name);
        name === "password"
          ? (errMsg = "Password needs to contain atleast 6 characters")
          : (errMsg = "Please enter a valid " + name);
      } else {
        errMsg = null;
      }
    });
    return errMsg;
  };

  const getError = (name: string) => {
    let err = false;
    fieldErr.forEach((fieldName) => {
      if (fieldName === name) {
        err = true;
      } else {
        err = false;
      }
    });
    return err;
  };

  const validateInput = (name: string, value: string) => {
    if (!runRegExValidation(name, value) || !value.length) {
      if (!fieldErr.includes(name)) {
        setFieldErr([...fieldErr, name]);
      }
    } else {
      removeFieldErr(name);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h5" className={classes.centerFlex}>
          Choose Payment Method
        </Typography>
        {props.deliveryOption?.name === "Post Nord" ? (
          <Typography className={classes.centerFlex}>
            Total price with shipping: {props.total}kr
          </Typography>
        ) : null}
        {props.deliveryOption?.name === "Budbee" ? (
          <Typography className={classes.centerFlex}>
            Total price with shipping: {props.total + 69}kr
          </Typography>
        ) : null}
        {props.deliveryOption?.name === "Instabox" ? (
          <Typography className={classes.centerFlex}>
            Total price with shipping: {props.total + 39}kr
          </Typography>
        ) : null}
        <Box className={classes.contentWrapper}>
          <Box
            className={`${classes.paymentMethodWrapper} ${classes.centerFlex}`}
            onClick={() => {
              props.setPaymentOption("swish");
              props.clearValues();
            }}
          >
            <img
              className={classes.paymentLogoSize}
              draggable="false"
              src={swishLogo}
              alt="swish"
            />
          </Box>
          <Box
            className={`${classes.paymentMethodWrapper} ${classes.centerFlex}`}
            onClick={() => {
              props.setPaymentOption("card");
              props.clearValues();
            }}
          >
            <img
              className={classes.paymentLogoSize}
              draggable="false"
              src={cardLogo}
              alt="card"
            />
          </Box>
          <Box
            className={`${classes.paymentMethodWrapper} ${classes.centerFlex}`}
            onClick={() => {
              props.setPaymentOption("giftcard");
              props.clearValues();
            }}
          >
            <Typography className={classes.centerFlex} variant="h6">
              GIFTCARD
            </Typography>
          </Box>
        </Box>
        <Box>
          {props.paymentOption === "swish" ? (
            <Box
              className={`${classes.centerFlex} ${classes.paymentInformation} animate__animated animate__fadeIn`}
            >
              <TextField
                className={classes.textFields}
                autoFocus
                label="Phone number for swish"
                defaultValue={usersContext.user?.phone}
                onChange={(event) => {
                  props.setSwishNumber(event.target.value);
                }}
                error={getError("phone")}
                helperText={getErrorMsg("phone")}
                onBlur={(e) => validateInput("phone", e.target.value)}
              />
            </Box>
          ) : null}
          {props.paymentOption === "card" ? (
            <Box
              className={`${classes.centerFlex} ${classes.paymentInformation} animate__animated animate__fadeIn`}
            >
              <TextField
                className={classes.textFields}
                autoFocus
                label="Name on card"
                onChange={(event) => {
                  props.setNameOnCard(event.target.value);
                }}
                error={getError("fullName")}
                helperText={getErrorMsg("fullName")}
                onBlur={(e) => validateInput("fullName", e.target.value)}
              />
              <TextField
                className={classes.textFields}
                label="Card number"
                onChange={(event) => {
                  props.setCardNumber(event.target.value);
                }}
                error={getError("card number")}
                helperText={getErrorMsg("card number")}
                onBlur={(e) => validateInput("card number", e.target.value)}
              />
              <TextField
                className={classes.textFields}
                label="CVC"
                onChange={(event) => {
                  props.setCvcNumber(event.target.value);
                }}
                error={getError("cvc")}
                helperText={getErrorMsg("cvc")}
                onBlur={(e) => validateInput("cvc", e.target.value)}
              />
            </Box>
          ) : null}
          {props.paymentOption === "giftcard" ? (
            <Box
              className={`${classes.centerFlex} ${classes.paymentInformation} animate__animated animate__fadeIn`}
            >
              <TextField
                className={classes.textFields}
                label="Giftcard number"
                onChange={(event) => {
                  props.setGiftCard(event.target.value);
                }}
              />
            </Box>
          ) : null}
        </Box>
        <Box className={`${classes.centerFlex} ${classes.loadingAnimation}`}>
          {props.isLoading ? <CircularProgress /> : null}
        </Box>
      </Box>
    </>
  );
}

export default PaymentMethod;

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "3rem",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paymentInformation: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  flexColumn: {
    flexDirection: "column",
    display: "flex",
  },
  centerFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentMethodWrapper: {
    width: "15rem",
    height: "8rem",
    border: "solid 1px black",
    margin: "1rem",
    padding: "2rem",
    borderRadius: 5,
    [theme.breakpoints.down("xs")]: {
      width: "10rem",
      height: "3rem",
    },
  },
  paymentLogoSize: {
    width: "10rem",
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "6rem",
      height: "auto",
    },
  },
  loadingAnimation: {
    margin: "5rem",
    [theme.breakpoints.down("xs")]: {
      margin: "2rem",
    },
  },
  textFields: {
    margin: "1rem 1rem",
    width: "15rem",
  },
}));
