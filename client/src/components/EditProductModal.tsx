import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Hidden,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./context/ProductsContext";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { Product } from "../helpers/typings";
import runRegExValidation from "../helpers/validation";
import { useHistory } from "react-router";

interface IProps {
  closeModal: () => void;
  editOpen: boolean;
  product: Product | undefined;
  newProduct: boolean;
  isProductNew: () => void;
}

function EditProductModal(props: IProps) {
  const classes = useStyles();

  const { addNewProduct, updateProduct } = useContext(ProductsContext);

  const history = useHistory();

  const [fieldErr, setFieldErr] = useState<string[]>([]);
  const [product, setProduct] = useState<Product>(
    props.product || ({} as Product)
  );

  // {
  //   name: props.product?.name,
  //   price: props.product?.price,
  //   img: props.product?.img,
  //   category: props.product?.category,
  //   description: props.product?.description,
  //   details: props.product?.details,
  //   care: props.product?.care,
  //   stock: props.product?.stock,
  // }

  function handleChange(value: string | number, key: keyof Product) {
    setProduct((prev: any) => {
      const productCopy = { ...prev };
      productCopy[key] = value;
      return productCopy;
    });
  }

  console.log(props.product);

  console.log(product);

  const getError = (name: string) => {
    let err = false;
    fieldErr.forEach((fieldName) => {
      if (fieldName === name) {
        err = true;
      } else {
        err = false;
      }
    });
    return err;
  };

  const getErrorMsg = (name: string) => {
    let errMsg = "";
    fieldErr.forEach((fieldName) => {
      if (fieldName === name) {
        errMsg = "Please enter a valid " + name;
      } else {
        errMsg = "";
      }
    });
    return errMsg;
  };

  const removeFieldErr = (name: string) => {
    setFieldErr((prev) =>
      prev.reduce((ack, item) => {
        if (item === name) {
          return ack;
        } else {
          return [...ack, item];
        }
      }, [] as string[])
    );
  };

  const validateInput = (name: string, value: string) => {
    if (!runRegExValidation(name, value) || !value.length) {
      if (!fieldErr.includes(name)) {
        setFieldErr([...fieldErr, name]);
      }
    } else {
      removeFieldErr(name);
    }
  };

  if (!props.product) return null;

  return (
    <Modal open={props.editOpen}>
      <Box className={classes.editContainer}>
        <Typography variant={"h3"}>Product settings</Typography>
        <Hidden only={"xs"}>
          <Box className={classes.editCard}>
            <Img
              src={[props.product.img, fallback]}
              draggable={false}
              alt="Bags from Pialetti"
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
            />
            <Box className={classes.cardText}>
              <Typography variant={"body1"}>
                {props.product.price}&nbsp;kr
              </Typography>
              <Typography variant={"body1"}>{props.product.name}</Typography>
            </Box>
          </Box>
        </Hidden>
        <Box className={classes.formContainer}>
          <form>
            <Box className={classes.smallerForms}>
              <Box mb={5} mt={5}>
                <TextField
                  className={classes.formWidth}
                  required
                  name="name"
                  variant={"outlined"}
                  onBlur={(event) =>
                    validateInput("product name", event.target.value)
                  }
                  error={getError("product name")}
                  helperText={getErrorMsg("product name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LabelOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="product-name"
                  label="Name"
                  onChange={(event) => {
                    handleChange(event.target.value, "name");
                  }}
                  defaultValue={props.product.name}
                ></TextField>
              </Box>

              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  variant={"outlined"}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="price"
                  type="number"
                  id="product-price"
                  label="price"
                  onBlur={(event) => validateInput("price", event.target.value)}
                  error={getError("price")}
                  helperText={getErrorMsg("price")}
                  onChange={(event) =>
                    handleChange(event.target.value, "price")
                  }
                  defaultValue={props.product.price}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  variant={"outlined"}
                  required
                  name="image"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={getError("image url")}
                  helperText={getErrorMsg("image url")}
                  onBlur={(event) =>
                    validateInput("image url", event.target.value)
                  }
                  id="product-Picture"
                  label="Image"
                  onChange={(event) => {
                    handleChange(event.target.value, "img");
                  }}
                  defaultValue={props.product.img}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  variant={"outlined"}
                  required
                  name="category"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FolderOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={props.product.category === [""]}
                  id="product-category"
                  label="category"
                  onChange={(event) =>
                    handleChange(event.target.value, "category")
                  }
                  defaultValue={props.product.category}
                ></TextField>
              </Box>
            </Box>
            <Box className={classes.largerForms}>
              <Box mb={5}>
                <TextField
                  required
                  className={classes.formWidth}
                  variant={"outlined"}
                  rows={15}
                  multiline={true}
                  name="description"
                  error={props.product.description === ""}
                  id="product-description"
                  label="description"
                  onChange={(event) =>
                    handleChange(event.target.value, "description")
                  }
                  defaultValue={props.product.description}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  required
                  className={classes.formWidth}
                  variant={"outlined"}
                  rows={15}
                  multiline={true}
                  name="details"
                  error={props.product.details === ""}
                  id="product-details"
                  label="details"
                  onChange={(event) =>
                    handleChange(event.target.value, "details")
                  }
                  defaultValue={props.product.details}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  required
                  variant={"outlined"}
                  rows={"10"}
                  multiline={true}
                  name="care"
                  error={props.product.care === ""}
                  id="product-care"
                  label="care"
                  onChange={(event) => handleChange(event.target.value, "care")}
                  defaultValue={props.product.care}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  variant={"outlined"}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="stock"
                  type="number"
                  error={props.product.stock === null}
                  id="product-stock"
                  label="Stock"
                  onChange={(event) =>
                    handleChange(event.target.value, "stock")
                  }
                  defaultValue={props.product.stock}
                ></TextField>
              </Box>
            </Box>
          </form>
        </Box>
        <Box mb={5} className={classes.buttonContainer}>
          <Box mr={4}>
            <Button
              variant="contained"
              onClick={() => {
                if (!fieldErr.length) {
                  history.replace("/admin");
                  props.closeModal();
                  if (props.newProduct) {
                    if (product) {
                      addNewProduct(product);
                    }
                    props.isProductNew();
                  } else {
                    if (product) {
                      updateProduct(product);
                    }
                  }
                }
              }}
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                props.closeModal();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  editContainer: {
    marginTop: "5rem",
    height: "80%",
    width: "60%",
    margin: "auto",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    outline: "0",
    [theme.breakpoints.down("md")]: {
      height: "100vh",
      marginTop: "2rem",
      width: "100%",
    },
  },
  formWidth: {
    minWidth: "50rem",
    [theme.breakpoints.down("md")]: {
      minWidth: "15rem",
    },
    [theme.breakpoints.only("md")]: {
      minWidth: "30rem",
    },
    [theme.breakpoints.only("sm")]: {
      minWidth: "30rem",
    },
  },
  editCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      // marginTop: "5rem",
      overflow: "auto",
      height: "100%",
    },
  },
  smallerForms: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      minWidth: "10rem",
    },
    [theme.breakpoints.only("md")]: {
      flexDirection: "column",
      minWidth: "10rem",
    },
  },
  largerForms: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  buttonContainer: {
    width: "10rem",
    display: "flex",
    flexDirection: "row",
  },
}));

export default EditProductModal;
