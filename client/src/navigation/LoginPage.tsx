import {
  Avatar,
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
//images
import alternativeCursorBlack from "../assets/alternativeCursorBlack.png";
import alternativeCursor from "../assets/alternativeCursor.png";
//icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router";
import { UsersContext } from "../components/context/UsersContext";
import { Link } from "react-router-dom";
import Section from "../components/Section";

function LoginPage() {
  const classes = useStyles();

  const history = useHistory();
  const usersContext = useContext(UsersContext);
  const [loading, setLoading] = useState(true);

  // const [logInProgress, setLogInProgress] = useState("default");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (usersContext.user) {
      history.replace("/");
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [usersContext.user]);

  const handleUserInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginInput({
      ...loginInput,
      [e.target.name]: value,
    });
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleLoginClick();
    }
  });

  // TODO: ADD CHECKS TO LOGIN VALIDATION
  const handleLoginClick = () => {
    usersContext.validateLogin(loginInput);
  };

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Section>
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUserInputs}
              value={loginInput.email}
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
              value={loginInput.password}
              onChange={handleUserInputs}
            />

            <Button
              onClick={handleLoginClick}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="large"
            >
              Sign In
            </Button>
          </form>

          <Button
            size="large"
            variant="outlined"
            color="primary"
            component={Link}
            to="/registration"
          >
            Register
          </Button>
        </div>
      </Box>
    </Section>
  );
}

const useStyles = makeStyles((theme) => ({
  catalogueStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "2rem 0",
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
