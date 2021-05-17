import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ProductGrid from "../components/ProductGrid";
import Collection from "../components/Collection";

function NewCollection() {
  const useStyles = makeStyles(() => ({
    catalogueStyles: {
      marginTop: "8.5rem",
    },
  }));
  const classes = useStyles();

  return (
    <Box className={classes.catalogueStyles}>
      <Collection />
      <Typography variant={"h3"} align={"center"}>
        Our bags
      </Typography>
      <Box mb={8} mt={5}>
        <ProductGrid isLarge={true} />
      </Box>
    </Box>
  );
}

export default NewCollection;
