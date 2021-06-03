import { Typography, Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/context/ProductsContext";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditableProductItem from "../components/EditableProductItem";
import EditProductModal from "../components/EditProductModal";
import { Product } from "../helpers/typings";

function AdminProducts() {
  const classes = useStyles();
  const productsContext = useContext(ProductsContext);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [emptyProduct] = useState<Product>({} as Product);
  const [newProduct, setNewProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>(productsContext.products);

  console.log({ editingProduct });

  useEffect(() => {
    setProducts(productsContext.products);
  }, [productsContext.products]);

  return (
    <Box className={classes.modalContainer}>
      <Typography variant={"h3"}>All products</Typography>
      <Box className={classes.productsContainer}>
        <Grid
          container
          item
          xs={12}
          spacing={1}
          className={classes.innerGridStyle}
        >
          {products.map((product, i) => {
            return (
              <EditableProductItem
                setEditingProduct={() => setEditingProduct(product)}
                product={product}
                key={i}
              />
            );
          })}
        </Grid>
        <Box className={classes.addItemButton}>
          <Button
            size="large"
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={() => {
              setEditingProduct(emptyProduct);
              setNewProduct(true);
            }}
          >
            Add New Product
          </Button>
        </Box>
      </Box>
      <EditProductModal
        newProduct={newProduct}
        isProductNew={() => setNewProduct(false)}
        closeModal={() => setEditingProduct(undefined)}
        editOpen={Boolean(editingProduct)}
        product={editingProduct}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      height: "100%",
      marginTop: "4rem",
    },
  },

  productsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",

    maxWidth: "1200px",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  productName: {
    fontSize: "0.6rem",
  },
  productCard: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "5rem",
    marginRight: "2rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "3rem",
      marginRight: "0rem",
    },
  },
  imageStyling: {
    marginRight: ".5rem",
    marginBottom: ".5rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  innerGridStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addItemButton: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "3rem",
      marginBottom: "3rem",
    },
  },
}));

export default AdminProducts;
