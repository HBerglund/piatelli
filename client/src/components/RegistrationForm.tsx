import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
//images
import alternativeCursorBlack from "../assets/alternativeCursorBlack.png";
import alternativeCursor from "../assets/alternativeCursor.png";
import { useHistory } from "react-router";
import { runRegExValidation } from "../helpers/helpers";

function RegistrationForm() {
  const classes = useStyles();
  const history = useHistory();

  const [registrationProgress, setRegistrationProgress] =
    useState<"default" | "failure" | "success">("default");

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [fieldErr, setFieldErr] = useState<string[]>([]);

  const [userInputs, setUserInputs] = useState({
    email: "",
    fullName: "",
    address: {
      street: "",
      zipcode: "",
      city: "",
      country: "",
    },
    phone: "",
    password: "",
    role: "customer",
  });

  const { email, password, fullName, phone, address } = userInputs;
  const { street, city, zipcode, country } = address;
  const inputFields = [
    { name: "email", value: email },
    { name: "fullName", value: fullName },
    { name: "phone", value: phone },
    { name: "street", value: street },
    { name: "city", value: city },
    { name: "zipcode", value: zipcode },
    { name: "country", value: country },
    { name: "password", value: password },
  ];

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (userInputs.password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [confirmPassword, userInputs.password]);

  const handleUserInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (
      e.target.name === "street" ||
      e.target.name === "zipcode" ||
      e.target.name === "city" ||
      e.target.name === "country"
    ) {
      setUserInputs({
        ...userInputs,
        address: { ...userInputs.address, [e.target.name]: value },
      });
    } else {
      setUserInputs({
        ...userInputs,
        [e.target.name]: value,
      });
    }
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const [showRoles, setShowRoles] = useState<boolean>(false);

  const handleRoleInput = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    setUserInputs({
      ...userInputs,
      role: value,
    });
  };

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

  const handleShowRoles = () => {
    setShowRoles((prev) => !prev);
  };

  const handleRegistrationClick = () => {
    validateRegistration();
  };

  const validateRegistration = () => {
    fetch("/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputs),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result._id) {
          setRegistrationProgress("success");
          history.replace("/login");
        } else {
          setErrMessage(result.message);
          setRegistrationProgress("failure");
          console.log(result);
        }
      });
  };

  const [errMessage, setErrMessage] = useState();

  const getErrorMsg = (name: string) => {
    let errMsg = "";
    fieldErr.forEach((fieldName) => {
      if (fieldName === name) {
        errMsg = "Please enter a valid " + name;
      } else {
        errMsg = "";
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
    <form className={classes.form} noValidate>
      {inputFields.map(({ name, value }) => {
        const formattedLabel = name.charAt(0).toUpperCase() + name.slice(1);
        return (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={name}
            label={
              name === "password"
                ? formattedLabel + " (at least 6 characters)"
                : formattedLabel
            }
            name={name}
            autoComplete={name}
            type={name === "password" ? "password" : "text"}
            onChange={handleUserInputs}
            onBlur={() => validateInput(name, value)}
            error={getError(name)}
            helperText={getErrorMsg(name)}
            value={value}
          />
        );
      })}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="current-password"
        value={confirmPassword}
        onChange={handlePasswordInput}
      />
      {!passwordMatch ? (
        <Typography className={classes.errorText}>
          Passwords doesn't match..
        </Typography>
      ) : null}
      <FormControl>
        <InputLabel onClick={handleShowRoles}>Role</InputLabel>
        <Select
          name="role"
          value={userInputs.role}
          open={showRoles}
          onOpen={handleShowRoles}
          onClose={handleShowRoles}
          onChange={handleRoleInput}
        >
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      {userInputs.role === "admin" ? (
        <Typography>
          If you choose to sign up as an admin, another admin has to approve you
          before you get admin rights
        </Typography>
      ) : null}

      {registrationProgress === "failure" ? (
        <Typography className={classes.errorText}>{errMessage}</Typography>
      ) : null}

      <Button
        onClick={handleRegistrationClick}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Register
      </Button>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  catalogueStyles: {
    marginTop: "8.5rem",
    marginBottom: "3rem",
  },
  landingContainer: {
    width: "50vw",
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "90vw",
    },
    [theme.breakpoints.only("lg")]: {
      width: "65vw",
    },
    [theme.breakpoints.only("xl")]: {
      width: "50vw",
    },
    [theme.breakpoints.only("md")]: {
      width: "70vw",
    },
    [theme.breakpoints.only("sm")]: {
      width: "70vw",
    },
  },
  customCursorBlack: {
    cursor: `url(${alternativeCursorBlack}) 9 7, auto`,
  },
  customCursor: {
    cursor: `url(${alternativeCursor}) 9 7, auto`,
  },
  cataloguePreviewContainer: {
    marginTop: "1rem",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    maxWidth: "500px",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: "rgba(255, 0, 0, 0.7)",
  },
}));

export default RegistrationForm;
