import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { OrderContext } from "./context/OrderContext";
import { UsersContext } from "./context/UsersContext";
import runRegExValidation from "../helpers/validation";
import { Address } from "../helpers/typings";

interface IProps {
  fullName: string | undefined;
  setFullName: (event: string) => void;
  email: string | undefined;
  setEmail: (event: string) => void;
  adress: string | undefined;
  setAdress: (event: string) => void;
  phoneNumber: string | undefined;
  setPhoneNumber: (event: string) => void;
  zipCode: string | undefined;
  setZipCode: (event: string) => void;
  country: string | undefined;
  setCountry: (event: string) => void;
  city: string | undefined;
  setCity: (event: string) => void;
}

function PersonalDetails(props: IProps) {
  const classes = useStyles();
  const usersContext = useContext(UsersContext);
  const orderContext = useContext(OrderContext);
  const history = useHistory();

  const { user } = usersContext;

  // THIS IS THE STATE THAT WE WANT TO SEND TO THE ORDER!!
  const [addressDetails, setAddressDetails] = useState<Address>({
    street: user?.address.street ? user?.address.street : "",
    zipcode: user?.address.zipcode ? user?.address.zipcode : "",
    city: user?.address.city ? user?.address.city : "",
    country: user?.address.country ? user?.address.country : "",
  });

  useEffect(() => {
    if (addressDetails) {
      orderContext.saveAddressDetails(addressDetails);
    }
  }, [addressDetails]);

  const [addressState, setAddressState] = useState<string>("savedAddress");

  const [fieldErr, setFieldErr] = useState<string[]>([]);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressState((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (addressState === "anotherAddress") {
      setAddressDetails({
        street: "",
        zipcode: "",
        city: "",
        country: "",
      });
    } else {
      setFieldErr([]);
      if (user) {
        setAddressDetails({
          street: user?.address.street,
          zipcode: user?.address.zipcode,
          city: user?.address.city,
          country: user?.address.country,
        });
      }
    }
  }, [addressState]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!usersContext.user) {
      history.replace("/login");
    }
  }, [usersContext]);

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
    <Box className={classes.root}>
      <Box className={classes.radioWrapper}>
        <FormControl component="fieldset">
          <RadioGroup
            style={{ display: "flex", flexDirection: "row" }}
            value={addressState}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value={"savedAddress"}
              control={<Radio />}
              label="Use saved address"
            />
            <FormControlLabel
              value={"anotherAddress"}
              control={<Radio />}
              label="Use another address"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Box>
          <Box className={classes.formContainer}>
            <form className={classes.contentWrapper} autoComplete="off">
              <Box className={classes.flexColumn}>
                <TextField
                  variant={"outlined"}
                  className={classes.textField}
                  label="Street"
                  name="street"
                  error={getError("street")}
                  helperText={getErrorMsg("street")}
                  onBlur={(e) => validateInput("street", e.target.value)}
                  onChange={handleInputChange}
                  value={addressDetails.street}
                  disabled={addressState === "savedAddress" ? true : false}
                />
              </Box>
              <Box className={classes.flexColumn}>
                <TextField
                  className={classes.textField}
                  variant={"outlined"}
                  name="zipcode"
                  label="Zipcode"
                  error={getError("zipcode")}
                  helperText={getErrorMsg("zipcode")}
                  onBlur={(e) => validateInput("zipcode", e.target.value)}
                  onChange={handleInputChange}
                  value={addressDetails.zipcode}
                  disabled={addressState === "savedAddress" ? true : false}
                />
                <TextField
                  className={classes.textField}
                  variant={"outlined"}
                  label="City"
                  name="city"
                  error={getError("city")}
                  helperText={getErrorMsg("city")}
                  onBlur={(e) => validateInput("city", e.target.value)}
                  onChange={handleInputChange}
                  value={addressDetails.city}
                  disabled={addressState === "savedAddress" ? true : false}
                />
                <TextField
                  className={classes.textField}
                  variant={"outlined"}
                  id="standard-required"
                  name="country"
                  label="Country"
                  error={getError("country")}
                  helperText={getErrorMsg("country")}
                  onBlur={(e) => validateInput("country", e.target.value)}
                  onChange={handleInputChange}
                  value={addressDetails.country}
                  disabled={addressState === "savedAddress" ? true : false}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default PersonalDetails;

const useStyles = makeStyles((theme) => ({
  root: {},
  userInformationWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  radioWrapper: {
    display: "flex",
    width: "100%",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center",
  },
  userInformation: {
    border: "1px solid black",
    padding: "1rem",
    margin: "1rem",
  },
  textAlign: {
    textAlign: "center",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "3rem",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
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

  paymentLogoSize: {
    width: "15rem",
  },

  textField: {
    margin: "0.5rem 2rem",
    width: "20rem",
    [theme.breakpoints.down("sm")]: {
      width: "12.5rem",
    },
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      overflow: "auto",
      height: "100%",
    },
  },
}));
