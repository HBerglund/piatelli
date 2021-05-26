import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
//images
import alternativeCursorBlack from "../assets/alternativeCursorBlack.png";
import alternativeCursor from "../assets/alternativeCursor.png";
//icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import RegistrationForm from "../components/RegistrationForm";

function Registration() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className={classes.catalogueStyles}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegistrationForm />
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
