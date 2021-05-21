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

function LoginPage() {
  const classes = useStyles();

  const [logInProgress, setLogInProgress] = useState("default");
  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUserInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInputs({
      ...userInputs,
      [e.target.name]: value,
    });
  };

  const validateLogin = () => {
    if (logInProgress === "success") {
      // run login fetch
    } else {
      setLogInProgress("failure");
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (logInProgress === "success") {
        // run login fetch
      } else {
        setLogInProgress("failure");
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleUserInputs}
            value={userInputs.username}
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
          {logInProgress === "failure" ? (
            <Typography className={classes.errorText}>
              Wrong username or password
            </Typography>
          ) : (
            <div></div>
          )}

          <Button
            onClick={validateLogin}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  catalogueStyles: {
    marginTop: "8.5rem",
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

export default LoginPage;
