import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import Collection from "../components/Collection";

function NewCollection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <ProductGrid filterBy="all" isLarge={true} />
      </Box>
    </Box>
  );
}

export default NewCollection;
