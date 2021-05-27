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
import { useContext, useState } from "react";
import { Product } from "./context/ProductsContext";
import { ProductsContext } from "./context/ProductsContext";
import fallback from "../assets/bags/fallback.png";
import { Img } from "react-image";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

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

  const [validInput, isInputValid] = useState(true);
  const [validUrlInput, isUrlInputValid] = useState(true);
  const [, setProduct] = useState<Product>();

  function checkInput(value: string) {
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if (format.test(value)) {
      isInputValid(false);
    } else {
      isInputValid(true);
    }
  }

  function checkUrl(value: string) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (pattern.test(value)) {
      isUrlInputValid(false);
    } else {
      isUrlInputValid(true);
    }
  }

  function handleChange(value: string | number, key: keyof Product) {
    /* const editedProduct = {...props.product}
    editedProduct[key] = value; 
    setProduct(editedProduct) */
    setProduct(props.product);
    setProduct((prev: any) => {
      prev[key] = value;
      return prev;
    });
  }

  if (!props.product) return null;

  return (
    <Modal open={props.editOpen}>
      <Box className={classes.editContainer}>
        <Typography variant={"h3"}>Product settings</Typography>
        <Hidden only={"xs"}>
          <Box className={classes.editCard}>
            <Img
              src={[props.product.preview, fallback]}
              draggable={false}
              alt="Bags from Pialetti"
              width="100"
              height="100"
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
                  error={!validInput}
                  helperText={"No special characters*"}
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
                    checkInput(event.target.value);
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
                  error={props.product.price === null}
                  id="product-price"
                  label="price"
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
                  name="Picture"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!validUrlInput}
                  helperText={"Please enter a valid url"}
                  id="product-Picture"
                  label="Picture"
                  onChange={(event) => {
                    handleChange(event.target.value, "preview");
                    checkUrl(event.target.value);
                  }}
                  defaultValue={props.product.preview}
                ></TextField>
              </Box>
              <Box mb={5}>
                <TextField
                  className={classes.formWidth}
                  variant={"outlined"}
                  required
                  name="collection"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FolderOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={props.product.collection === ""}
                  id="product-collection"
                  label="collection"
                  onChange={(event) =>
                    handleChange(event.target.value, "collection")
                  }
                  defaultValue={props.product.collection}
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
            </Box>
          </form>
        </Box>
        <Box mb={5} className={classes.buttonContainer}>
          <Box mr={4}>
            <Button
              variant="contained"
              onClick={() => {
                if (validInput && validUrlInput) {
                  window.location.href = "/admin";
                  if (props.newProduct) {
                    addNewProduct(props.product!);
                    props.isProductNew();
                  } else {
                    updateProduct(props.product!);
                  }
                }
              }}
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button variant="contained" onClick={props.closeModal}>
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
