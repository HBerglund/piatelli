import {
  Typography,
  Box,
  Button,
  Grid,
  Hidden,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";
import {
  Product,
  ProductsContext,
} from "../components/context/ProductsContext";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ClearIcon from "@material-ui/icons/Clear";
import EditProductModal from "../components/EditProductModal";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";

function AdminPage() {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [emptyProduct] = useState<Product>({} as Product);
  const [newProduct, setNewProduct] = useState(false);

  const { removeProduct } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box className={classes.modalContainer}>
        <Typography variant={"h3"}>Admin page</Typography>
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
                <div key={i}>
                  <Box key={i} className={classes.productCard}>
                    <Hidden only={"xs"}>
                      <Img
                        src={[product.preview, fallback]}
                        className={classes.imageStyling}
                        draggable={false}
                        alt="Bags from Pialetti"
                        width="150"
                        height="150"
                      />
                    </Hidden>
                    <Hidden smUp>
                      <img
                        src={product.preview}
                        className={classes.imageStyling}
                        draggable={false}
                        alt="Bags from Pialetti"
                        width="50"
                        height="50"
                      />
                    </Hidden>
                    <Box className={classes.flexRow}>
                      <Typography
                        variant={"body1"}
                        className={classes.productName}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                    <Box className={classes.flexRow}>
                      <Typography
                        variant={"body1"}
                        className={classes.productName}
                      >
                        {product.price}&nbsp;kr
                      </Typography>
                    </Box>
                    <div>
                      <Tooltip title="Edit" arrow>
                        <Button onClick={() => setEditingProduct(product)}>
                          <EditOutlinedIcon fontSize={"small"} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <Button onClick={() => removeProduct(product)}>
                          <ClearIcon fontSize={"small"} />
                        </Button>
                      </Tooltip>
                    </div>
                  </Box>
                </div>
              );
            })}
          </Grid>
          <Box className={classes.addItemButton}>
            <Tooltip title="Add product" arrow>
              <Button
                onClick={() => {
                  setEditingProduct(emptyProduct);
                  setNewProduct(true);
                }}
              >
                <PostAddIcon fontSize={"large"} />
              </Button>
            </Tooltip>
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
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    height: "80vh",
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
    maxWidth: "100%",
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

export default AdminPage;
