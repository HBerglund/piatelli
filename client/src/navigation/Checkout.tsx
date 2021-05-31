import {
  Box,
  Button,
  Hidden,
  Link,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import PersonalDetails from "../components/PersonalDetails";
import DeliveryOptions from "../components/DeliveryOptions";
import PaymentMethod from "../components/PaymentMethod";
import { CartContext, CartItem } from "../components/context/CartContext";
import OrderComfirmation from "../components/OrderComfirmation";
import GroupedButtons from "../components/CartIncrementer";
import { Img } from "react-image";
import fallback from "../assets/bags/fallback.png";
import { useHistory } from "react-router";
import { Delivery } from "../helpers/typings";
import { UsersContext } from "../components/context/UsersContext";
import Section from "../components/Section";

function getSteps() {
  return ["Shopping Cart", "Delivery", "Payment", "Order Confirmation"];
}

function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const usersContext = useContext(UsersContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usersContext.user) {
      history.replace("/login");
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [usersContext.user]);

  //Step counter
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  //Form states (cst details)
  const [fullName, setFullName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [adress, setAdress] = useState<string>();
  const [zipCode, setZipCode] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [deliveryOption, setDeliveryOption] = useState<Delivery>();

  function validation(value: number | string, pattern: RegExp) {
    const charPattern = pattern;
    return charPattern.test(String(value));
  }

  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const noSpecialCharsRegEx = /^[A-Öa-ö0-9'.-\s,]{1,50}$/;
  const phoneRegEx = /^[0-9]{2,4}[0-9]{2,3}[0-9]{2,3}[0-9]{2,3}$/;
  const zipCodeRegEx = /^[0-9]{5,5}$/;

  const isFormValid =
    validation(fullName!, noSpecialCharsRegEx) &&
    validation(parseInt(phoneNumber!), phoneRegEx) &&
    deliveryOption &&
    validation(email!, emailRegEx) &&
    validation(adress!, noSpecialCharsRegEx) &&
    validation(zipCode!, zipCodeRegEx) &&
    validation(country!, noSpecialCharsRegEx) &&
    validation(city!, noSpecialCharsRegEx);

  // Payment state
  const [paymentOption, setPaymentOption] = useState<string>();
  const [nameOnCard, setNameOnCard] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();
  const [cvcNumber, setCvcNumber] = useState<string>();
  const [giftCard, setGiftCard] = useState<string>();
  const [swishNumber, setSwishNumber] = useState(phoneNumber);
  const [isLoading, setIsLoading] = useState(false);

  const creditCardRegEx =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  const cvcRegEx = /^[0-9]{3,3}$/;

  const isCardValid =
    validation(nameOnCard!, noSpecialCharsRegEx) &&
    validation(cardNumber!, creditCardRegEx) &&
    validation(cvcNumber!, cvcRegEx);
  const isPaymentValid =
    paymentOption && (isCardValid || giftCard || swishNumber);

  // value clearing for payment methods (when user swaps from one method to another)
  function clearValues() {
    setCardNumber(undefined);
    setSwishNumber(undefined);
    setCvcNumber(undefined);
    setGiftCard(undefined);
  }
  // Styling
  const classes = useStyles();

  //get content of cart from context/ls
  const { cart, clearCart } = useContext(CartContext);
  const total = cart.reduce(
    (ack: number, item) => ack + item.quantity * item.price,
    0
  );
  const [payedProducts, setPayedProducts] = useState<CartItem[]>();
  const [totalPayed, setTotalPayed] = useState<number>();
  // let payedProducts = [''];

  // changes to the stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  //promise for "awaiting" payment validation
  const paymentPromise = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  async function makePayment() {
    // run create order in OrderContext

    setIsLoading(true);
    setPayedProducts(cart);
    setTotalPayed(total);
    await paymentPromise();
    clearCart();
    handleNext();
  }

  //Cases for stepper
  //Each case is one step on the stepper
  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <Box mb={10}>
            <Typography variant="h5" className={classes.centerFlex}>
              Products in cart
            </Typography>
            <Typography variant="body1" className={classes.centerFlex}>
              Total: {total} kr
            </Typography>
            <Box className={classes.cartContentWrapper}>
              {cart.length === 0 ? (
                <Typography className={classes.centerFlex} variant="h6">
                  Cart is empty
                </Typography>
              ) : null}
              {cart.map((product: CartItem, i) => (
                <Box key={i} className={classes.cartContent}>
                  <Link href={`/products/${product.name}`}>
                    <Img
                      src={[product.img, fallback]}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        margin: "0 2rem",
                      }}
                    />
                  </Link>
                  <div className={classes.productInfo}>
                    <Typography variant="body2">{product.name}</Typography>
                    <Typography variant="body1">
                      Price: {product.price} kr
                    </Typography>
                    <GroupedButtons product={product} />
                  </div>
                </Box>
              ))}
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box mb={10}>
            <Box>
              <PersonalDetails
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                adress={adress}
                setAdress={setAdress}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                zipCode={zipCode}
                setZipCode={setZipCode}
                country={country}
                setCountry={setCountry}
                city={city}
                setCity={setCity}
              />
              <Box>
                <DeliveryOptions
                  deliveryOption={deliveryOption}
                  setDeliveryOption={setDeliveryOption}
                />
              </Box>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box mb={10}>
            <PaymentMethod
              deliveryOption={deliveryOption}
              setPaymentOption={setPaymentOption}
              setSwishNumber={setSwishNumber}
              setNameOnCard={setNameOnCard}
              setCardNumber={setCardNumber}
              setCvcNumber={setCvcNumber}
              setGiftCard={setGiftCard}
              paymentOption={paymentOption}
              phoneNumber={phoneNumber}
              fullName={fullName}
              total={total}
              clearValues={clearValues}
              isLoading={isLoading}
            />
          </Box>
        );
      case 3:
        return (
          <Box mb={10}>
            <OrderComfirmation
              name={fullName}
              adress={adress}
              phoneNumber={phoneNumber}
              zipCode={zipCode}
              country={country}
              city={city}
              email={email}
              payedProducts={payedProducts}
              deliveryOption={deliveryOption}
              total={totalPayed}
            />
          </Box>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Section>
      <Box mb={10}>
        <Box className={classes.root}>
          <Hidden only={"xs"}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Hidden>

          <Box>
            {activeStep === steps.length ? (
              <Box>
                <Typography>All steps completed</Typography>
                <Box className={classes.buttonWrapper}>
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box>{getStepContent(activeStep)}</Box>
                <Box className={classes.buttonWrapper}>
                  <Button
                    disabled={activeStep === 0 || activeStep === 3}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  {activeStep === 0 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={cart.length === 0}
                    >
                      {activeStep === steps.length - 1 ? "Error" : "Next"}
                    </Button>
                  ) : null}
                  {activeStep === 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!isFormValid}
                    >
                      {activeStep === steps.length - 1 ? "Error" : "Next"}
                    </Button>
                  ) : null}
                  {activeStep === 2 ? (
                    <Button
                      variant="contained"
                      onClick={makePayment}
                      disabled={!isPaymentValid}
                    >
                      {activeStep === steps.length - 1 ? "Error" : "Next"}
                    </Button>
                  ) : null}
                  {activeStep === 3 ? (
                    <Link href="/#">
                      <Button variant="contained">
                        {activeStep === steps.length - 1
                          ? "Continue shopping"
                          : "Error"}
                      </Button>
                    </Link>
                  ) : null}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 10rem",
    // border: "solid 2px black",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  mobileStepper: {
    overflowX: "auto",
    width: "auto",
    margin: 0,
  },
  buttonWrapper: {
    position: "absolute",
    display: "flex",
    bottom: "-2rem",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      position: "relative",
      width: "auto",
      marginTop: "1rem",
    },
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "3rem",
    flexDirection: "row",
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
    border: "solid 1px black",
    margin: "1rem",
    padding: "2rem",
    borderRadius: 5,
  },
  paymentLogoSize: {
    width: "15rem",
  },
  cartContentWrapper: {
    overflow: "auto",
    paddingBottom: "4rem",
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
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
  },
  cartContent: {
    margin: "1rem 2rem",
    display: "flex",
    alignItems: "flex-end",
  },
  productInfo: {
    marginLeft: "1rem",
  },
}));
export default Checkout;
