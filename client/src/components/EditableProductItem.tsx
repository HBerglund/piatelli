import {
  Box,
  Button,
  Hidden,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { Img } from "react-image";
import { ProductsContext } from "./context/ProductsContext";
import fallback from "../assets/bags/fallback.png";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import { Product } from "../helpers/typings";

interface Props {
  product: Product;
  i: number;
  setEditingProduct: (product: Product) => void;
}

function EditableProductItem(props: Props) {
  const classes = useStyles();
  const { product, i } = props;

  const { removeProduct } = useContext(ProductsContext);

  return (
    <div key={i}>
      <Box key={i} className={classes.productCard}>
        <Hidden only={"xs"}>
          <Img
            src={[product.img, fallback]}
            className={classes.imageStyling}
            draggable={false}
            alt="Bags from Pialetti"
            width="150"
            height="150"
          />
        </Hidden>
        <Hidden smUp>
          <img
            src={product.img}
            className={classes.imageStyling}
            draggable={false}
            alt="Bags from Pialetti"
            width="50"
            height="50"
          />
        </Hidden>
        <Box className={classes.flexRow}>
          <Typography variant={"body1"} className={classes.productName}>
            {product.name}
          </Typography>
        </Box>
        <Box className={classes.flexRow}>
          <Typography variant={"body1"} className={classes.productName}>
            {product.price}&nbsp;kr
          </Typography>
        </Box>
        <div>
          <Tooltip title="Edit" arrow>
            <Button onClick={() => props.setEditingProduct(product)}>
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
}

const useStyles = makeStyles((theme) => ({
  productName: {
    fontSize: "0.8rem",
  },
  productCard: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "4rem",
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

export default EditableProductItem;
