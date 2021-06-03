import { Box, Button, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Box>
      <Header />
      <Box style={errorContainer}>
        <Typography variant="h3">Page doesn't exist...</Typography>
        <Button component={Link} to="/">
          Back to home
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}

export default PageNotFound;

const errorContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "10rem",
  height: "100vh",
};
