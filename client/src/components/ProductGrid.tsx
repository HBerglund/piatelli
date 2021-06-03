import { Grid, Box, Typography, Button, Hidden } from "@material-ui/core";
import { useState, useContext } from "react";
import alternativeCursor from "../assets/alternativeCursor.png";
import { ProductsContext } from "./context/ProductsContext";
import { CartContext } from "./context/CartContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";
interface IProps {
  isLarge: boolean;
  filterBy: string;
}

function ProductGrid(props: IProps, id: string) {
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const [isLarge] = useState(props.isLarge);
  const [isHover, setIsHover] = useState(id);
  const previewCatalogue = products.slice(1, 7);
  const classes = useStyles();

  const filteredProducts = products.filter((product) => {
    if (props.filterBy === "all") {
      return product;
    } else {
      for (const category of product.category) {
        if (category === props.filterBy) return product;
      }
      return null;
    }
  });

  return (
    <Box>
      {isLarge ? (
        <Grid className={classes.gridWidth}>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            className={classes.innerGridStyle}
          >
            {filteredProducts.map((product, i) => (
              <Box
                key={i}
                className={classes.boxStyle}
                onMouseLeave={() => setIsHover("null")}
              >
                <Typography variant="h6">
                  <Hidden only={["xs", "sm", "md"]}>
                    <Img
                      style={{ objectFit: "cover" }}
                      onMouseEnter={() => setIsHover(product.name)}
                      src={product.imgUrl}
                      className={classes.customCursor}
                      draggable={false}
                      alt="Bags from Pialetti"
                      width="400"
                      height="400"
                    />
                  </Hidden>
                  <Hidden only={["lg", "xl"]}>
                    <Box className={classes.flexColumn}>
                      <Link
                        className={classes.linkStyling}
                        to={`/products/${product.name}`}
                      >
                        <Box>
                          <Img
                            style={{ objectFit: "cover" }}
                            onMouseEnter={() => setIsHover(product.name)}
                            src={[product.img, fallback]}
                            className={classes.customCursor}
                            draggable={false}
                            alt="Bags from Pialetti"
                            width="150"
                            height="150"
                          />
                          <Box>
                            <Typography variant="body2">
                              {product.name}
                            </Typography>
                            <Typography>{product.price}kr</Typography>
                          </Box>
                        </Box>
                      </Link>

                      <Hidden only={["xs", "sm", "md"]}>
                        <Link color="inherit" to={`/products/${product.name}`}>
                          <Typography
                            variant="body1"
                            className={`${classes.moreInfoStyle} ${classes.customCursor}`}
                          >
                            More info
                          </Typography>
                        </Link>
                      </Hidden>
                    </Box>
                  </Hidden>
                </Typography>
                <Hidden only={["xs", "sm", "md"]}>
                  {isHover === product.name ? (
                    <>
                      <Box
                        className={`${classes.hoverContainer} ${classes.customCursor}`}
                      >
                        <Box
                          className={`${classes.hoverEffect} ${classes.customCursor}`}
                        >
                          <Box
                            className={`${classes.hoverText} ${classes.customCursor}`}
                          >
                            <Box className={classes.customCursor}>
                              <Link
                                className={`${classes.linkStyle} ${classes.customCursor}`}
                                to={`/products/${product.name}`}
                              >
                                <Typography
                                  variant="body1"
                                  className={`${classes.moreInfoStyle} ${classes.customCursor}`}
                                >
                                  More info
                                </Typography>
                              </Link>
                              <Typography variant="h5">
                                {product.name}
                              </Typography>
                            </Box>
                            <Typography variant="body1">
                              {product.price}&nbsp;kr
                            </Typography>
                          </Box>
                          <Box
                            className={`${classes.buttonContainer} ${classes.customCursor}`}
                          >
                            <Button
                              className={classes.button}
                              onClick={() => {
                                addToCart(product);
                              }}
                            >
                              <Typography
                                variant="button"
                                className={classes.customCursor}
                              >
                                Add to cart
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  ) : null}
                </Hidden>
              </Box>
            ))}
          </Grid>
        </Grid>
      ) : (
        //   isLarge: False will render this code vvvv
        <Grid className={classes.gridWidth}>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            className={classes.innerGridStyle}
          >
            {previewCatalogue.map((product, i) => (
              <Box
                className={classes.boxStyle}
                onMouseLeave={() => setIsHover("null")}
                key={product.name}
              >
                <Typography variant="h6">
                  <Hidden mdDown>
                    <Img
                      style={{ objectFit: "cover" }}
                      onMouseEnter={() => setIsHover(product.name)}
                      src={[product.img, fallback]}
                      className={classes.customCursor}
                      draggable={false}
                      alt="Bags from Pialetti"
                      width="400"
                      height="400"
                    />
                  </Hidden>
                  <Hidden smUp>
                    <Link to={`/products/${product.name}`}>
                      <Img
                        onMouseEnter={() => setIsHover(product.name)}
                        src={[product.img, fallback]}
                        className={classes.customCursor}
                        draggable={false}
                        alt="Bags from Pialetti"
                        width="150"
                        height="150"
                      />
                    </Link>
                  </Hidden>
                  <Hidden only={["xs", "sm", "lg", "xl"]}>
                    <Link to={`/products/${product.name}`}>
                      <Img
                        style={{ objectFit: "cover" }}
                        onMouseEnter={() => setIsHover(product.name)}
                        src={[product.img, fallback]}
                        className={classes.customCursor}
                        draggable={false}
                        alt="Bags from Pialetti"
                        width="300"
                        height="300"
                      />
                    </Link>
                  </Hidden>
                  <Hidden only={["xs", "md", "lg", "xl"]}>
                    <Link to={`/products/${product.name}`}>
                      <Img
                        onMouseEnter={() => setIsHover(product.name)}
                        src={[product.img, fallback]}
                        className={classes.customCursor}
                        draggable={false}
                        alt="Bags from Pialetti"
                        width="200"
                        height="200"
                      />
                    </Link>
                  </Hidden>
                </Typography>

                {isHover === product.name ? (
                  <Hidden only={["xs", "sm", "md"]}>
                    <>
                      <Box
                        className={`${classes.hoverContainer} ${classes.customCursor}`}
                      >
                        <Box
                          className={`${classes.hoverEffect} ${classes.customCursor}`}
                        >
                          <Box
                            className={`${classes.hoverText} ${classes.customCursor}`}
                          >
                            <Box
                              className={`${classes.hoverText} ${classes.customCursor}`}
                            >
                              <Link
                                className={`${classes.linkStyle} ${classes.customCursor}`}
                                to={`/products/${product.name}`}
                              >
                                <Typography
                                  variant="body1"
                                  className={`${classes.moreInfoStyle} ${classes.customCursor}`}
                                >
                                  More info
                                </Typography>
                              </Link>
                              <Typography
                                variant="h5"
                                className={classes.productTitle}
                              >
                                {product.name}
                              </Typography>
                            </Box>
                            <Typography variant="body1">
                              {product.price}&nbsp;kr
                            </Typography>
                            <Hidden only="xs">
                              <Box
                                className={`${classes.buttonContainer} ${classes.customCursor}`}
                              >
                                <Button
                                  className={classes.button}
                                  onClick={() => {
                                    addToCart(product);
                                  }}
                                >
                                  <Typography
                                    variant="button"
                                    className={classes.customCursor}
                                  >
                                    Add to cart
                                  </Typography>
                                </Button>
                              </Box>
                            </Hidden>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  </Hidden>
                ) : null}
              </Box>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  linkStyle: {
    textDecoration: "none",
    color: "black",
    position: "relative",
    top: "14.5rem",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      top: "6.9rem",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "120px",
    height: "60px",
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60px",
      height: "30px",
    },
  },
  linkStyling: {
    textDecoration: "none",
    color: "black",
  },
  productTitle: {
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      marginBottom: "2rem",
      marginTop: 0,
    },
  },
  hoverText: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    color: "black",
    textDecoration: "none",
  },
  hoverContainer: {
    position: "relative",
    bottom: "25.5rem",
  },
  hoverEffect: {
    top: "0",
    position: "absolute",
    width: "400px",
    height: "400px",
    backgroundColor: "rgba(231, 234, 249, 0.2)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "backgdrop-filter 1000ms linear",
  },
  gridWidth: {
    maxWidth: "1400px",
    margin: "auto",
  },
  innerGridStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxStyle: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    textAlign: "center",
  },
  customCursor: {
    cursor: `url(${alternativeCursor}) 9 7, auto`,
  },
  button: {
    height: "2rem",
    width: "8rem",
    border: "solid 1.5px black",
    borderRadius: "0%",
    textDecoration: "none",
    position: "absolute",
    bottom: "4rem",
  },
  moreInfoStyle: {
    marginTop: "0rem",
  },
  flexColumn: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default ProductGrid;
