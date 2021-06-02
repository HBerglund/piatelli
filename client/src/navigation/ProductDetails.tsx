//node components
import { Typography, Box, Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//context
import { CartContext } from "../components/context/CartContext";
import { ProductsContext } from "../components/context/ProductsContext";
import cry from "../assets/cry.jpg";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";

const textInfoStrings = ["Description", "Detail", "Care"];

function ProductDetails() {
  const [textView, setTextView] = useState<string>("Description");
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const classes = useStyles();
  const params = useParams<{ name: string }>();
  const detailViewProduct = products.find((p) => p.name === params.name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!detailViewProduct) {
    return (
      <div className={classes.exists}>
        <img src={cry} alt="cry" width={200} height={200} />
        <p>This product does not exist :'(</p>
      </div>
    );
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.productWrapper}>
        <Img
          src={[detailViewProduct.img, fallback]}
          alt=""
          className={classes.preview}
        />
      </Box>
      <Box className={classes.infoWrapper}>
        <Box className={classes.detailPadding}>
          <Hidden only={"xs"}>
            <Hidden only={"sm"}>
              <Box style={{ display: "flex" }}>
                {detailViewProduct.category.map((c) => (
                  <Typography
                    variant="subtitle1"
                    style={{ marginRight: "1rem" }}
                  >
                    {c}
                  </Typography>
                ))}
              </Box>
            </Hidden>
          </Hidden>
          <Box className={classes.column}>
            <Typography>
              <h2 className={classes.headerText}>{detailViewProduct.name}</h2>
            </Typography>

            <Typography>
              <h4 className={classes.headerText}>
                {detailViewProduct.price}&nbsp;kr
              </h4>
            </Typography>
          </Box>
          <div className={classes.row}>
            {textInfoStrings.map((tab) => (
              <Typography
                variant={"body2"}
                className={classes.padding}
                onClick={() => {
                  setTextView(tab);
                }}
                style={
                  textView === tab
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
              >
                {tab}
              </Typography>
            ))}
          </div>
          <Box className={classes.row}>
            {textView === "Description" ? (
              <Typography>{detailViewProduct.description}</Typography>
            ) : null}
            {textView === "Detail" ? (
              <Typography>{detailViewProduct.details}</Typography>
            ) : null}
            {textView === "Care" ? (
              <Typography>{detailViewProduct.care}</Typography>
            ) : null}
          </Box>
        </Box>
        <Button
          className={classes.button}
          onClick={() => {
            addToCart(detailViewProduct);
          }}
        >
          <Typography variant="button">Add to cart</Typography>
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "10rem",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },
  },
  preview: {
    objectFit: "cover",
    objectPosition: "bottom",
    width: 600,
    maxHeight: 700,

    [theme.breakpoints.down("xs")]: {
      height: "100%",
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      height: "80%",
      width: "80%",
    },
  },
  productWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30rem",
    height: "50rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    },
  },
  button: {
    color: "white",
    height: "3rem",
    width: "77%",
    border: "solid 1.5px black",
    borderRadius: "0%",
    background: "black",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem 0 2rem 0",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  padding: {
    paddingRight: "2rem",
  },
  detailPadding: {
    padding: "3rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0rem 0rem 0.5rem 1rem",
    },
  },
  headerText: {
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem",
    },
  },
  exists: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "10rem",
  },
}));

export default ProductDetails;
