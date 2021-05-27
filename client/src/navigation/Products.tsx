import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/context/ProductsContext";
import ProductGrid from "../components/ProductGrid";
import Section from "../components/Section";

function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productsContext = useContext(ProductsContext);

  const [filter, setFilter] = useState("all");

  const useStyles = makeStyles(() => ({
    catalogueStyles: {},
    categoriesWrapper: {
      display: "flex",
      justifyContent: "center",
      padding: "2rem",
    },
    categoryButton: {
      margin: "0 2rem",
    },
  }));
  const classes = useStyles();

  console.log(filter);

  return (
    <Section>
      <Box className={classes.catalogueStyles}>
        <Typography variant={"h3"} align={"center"}>
          Our Products
        </Typography>
        <Box className={classes.categoriesWrapper}>
          <Button
            onClick={() => setFilter("all")}
            className={classes.categoryButton}
          >
            All Products
          </Button>
          {productsContext.categories.map((category) => (
            <Button
              onClick={() => setFilter(category)}
              className={classes.categoryButton}
            >
              {category}
            </Button>
          ))}
        </Box>
        <Box mb={8} mt={5}>
          <ProductGrid filterBy={filter} isLarge={true} />
        </Box>
      </Box>
    </Section>
  );
}

export default Products;
