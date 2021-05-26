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

function RegistrationForm() {
  const classes = useStyles();
  const history = useHistory();

  const [registrationProgress, setRegistrationProgress] =
    useState<"default" | "failure" | "success">("default");

  const [passwordMatch, setPasswordMatch] = useState(true);

  // const stringArr = ["email", "fullName","street","zipcode","city","email","email","email","email","email",]
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

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (userInputs.password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [confirmPassword]);

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

  const handleShowRoles = () => {
    setShowRoles((prev) => !prev);
  };

  const handleRegistrationClick = () => {
    validateRegistration();
  };

  const [errMessage, setErrMessage] = useState();

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

  return (
    <form className={classes.form} noValidate>
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
        id="street"
        label="Street Address"
        name="street"
        autoComplete="street"
        autoFocus
        onChange={handleUserInputs}
        value={userInputs.address.street}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="zipcode"
        label="Zip Code"
        name="zipcode"
        autoComplete="zipcode"
        autoFocus
        onChange={handleUserInputs}
        value={userInputs.address.zipcode}
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
        value={userInputs.address.city}
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
        value={userInputs.address.country}
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
        value={confirmPassword}
        onChange={handlePasswordInput}
      />
      {!passwordMatch ? (
        <Typography className={classes.errorText}>
          Passwords doesn't match..
        </Typography>
      ) : (
        <div></div>
      )}
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
