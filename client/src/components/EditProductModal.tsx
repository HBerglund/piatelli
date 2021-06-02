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
import { ChangeEvent, useContext, useEffect, useState } from "react";
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
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (props.product) {
      setProduct({ ...props.product });
    }
  }, [props.product]);

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

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = e.target;
    if (product)
      setProduct({
        ...product,
        [name]: value,
      });
  }

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

  const getErrorMsg = (name: string) => {
    let errMsg: string | null = null;

    fieldErr.forEach((fieldName) => {
      if (fieldName === name) {
        name === "fullName"
          ? (errMsg = "Please enter a valid full name")
          : (errMsg = "Please enter a valid " + name);
        name === "password"
          ? (errMsg = "Password needs to contain atleast 6 characters")
          : (errMsg = "Please enter a valid " + name);
      } else {
        errMsg = null;
      }
    });
    return errMsg;
  };

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
        <Typography variant="subtitle1">Update product information</Typography>
        <Hidden only={"xs"}>
          <Box className={classes.editCard}>
            <Img
              src={[props.product.img, fallback]}
              draggable={false}
              alt="Bags from Pialetti"
              width="100"
              height="100"
              style={{ objectFit: "cover", marginBottom: "1rem" }}
            />
            <Box className={classes.cardText}>
              <Typography variant={"body2"}>{props.product.name}</Typography>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  defaultValue={props.product.price}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  variant={"outlined"}
                  required
                  name="img"
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  error={getError("description")}
                  helperText={getErrorMsg("description")}
                  onBlur={(event) =>
                    validateInput("description", event.target.value)
                  }
                  id="product-description"
                  label="description"
                  onChange={handleChange}
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
                  error={getError("details")}
                  helperText={getErrorMsg("details")}
                  onBlur={(event) =>
                    validateInput("details", event.target.value)
                  }
                  id="product-details"
                  label="details"
                  onChange={handleChange}
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
                  error={getError("care")}
                  helperText={getErrorMsg("care")}
                  onBlur={(event) => validateInput("care", event.target.value)}
                  id="product-care"
                  label="care"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                if (!fieldErr.length && product) {
                  history.replace("/admin");
                  props.closeModal();
                  if (props.newProduct) {
                    addNewProduct(product);
                    props.isProductNew();
                  } else {
                    updateProduct(product);
                  }
                  props.closeModal();
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
    borderRadius: "8px",
    height: "80%",
    width: "60%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    outline: "0",
    padding: "2rem 2rem 0 2rem",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
    margin: "1rem 0",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
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
