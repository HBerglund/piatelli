import {
  Avatar,
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
//images
import alternativeCursorBlack from "../assets/alternativeCursorBlack.png";
import alternativeCursor from "../assets/alternativeCursor.png";
//icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Registration() {
  const classes = useStyles();

  const [registrationProgress, setRegistrationProgress] =
    useState<"default" | "failure" | "success">("default");

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [userInputs, setUserInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    zipCode: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(userInputs);

  useEffect(() => {
    if (userInputs.password !== userInputs.confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [userInputs]);

  const handleUserInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInputs({
      ...userInputs,
      [e.target.name]: value,
    });
  };

  const validateRegistration = () => {
    if (registrationProgress === "success") {
      // run registration fetch
    } else {
      setRegistrationProgress("failure");
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (registrationProgress === "success") {
        // run registration fetch
      } else {
        setRegistrationProgress("failure");
      }
    }
  });

  return (
    <Box className={classes.catalogueStyles}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.fullName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.phone}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="street"
            label="Street Address"
            name="street"
            autoComplete="street"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.street}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="zipCode"
            label="Zip Code"
            name="zipCode"
            autoComplete="zipCode"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.zipCode}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="city"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.city}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="country"
            label="Country"
            name="country"
            autoComplete="country"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.country}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userInputs.password}
            onChange={handleUserInputs}
          />
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
            value={userInputs.confirmPassword}
            onChange={handleUserInputs}
          />
          {registrationProgress === "failure" ? (
            <Typography className={classes.errorText}>
              some error message
            </Typography>
          ) : (
            <div></div>
          )}
          {!passwordMatch ? (
            <Typography className={classes.errorText}>
              Passwords doesn't match..
            </Typography>
          ) : (
            <div></div>
          )}

          <Button
            onClick={validateRegistration}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Box>
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

export default Registration;
