import { Box, TextField, Typography, Badge, Hidden } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingCart as CartIcon } from "@material-ui/icons";
import "animate.css/animate.css";
import Cart from "./Cart";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "./context/CartContext";
import { useContext } from "react";
import { ProductsContext } from "./context/ProductsContext";
import { UsersContext } from "./context/UsersContext";
import { Link } from "react-router-dom";

function Header() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { products } = useContext(ProductsContext);
  const { cart } = useContext(CartContext);
  const classes = useStyles();
  const usersContext = useContext(UsersContext);

  const amountOfItemsInCart = cart.reduce(
    (ack: number, item) => ack + item.quantity,
    0
  );

  function hideCart() {
    setIsCartVisible(false);
  }

  return (
    <Box className={classes.rootStyle}>
      <Hidden only={"xs"}>
        <Link to="/" color="inherit">
          <Typography variant="h1">PIATTELLI</Typography>
        </Link>
      </Hidden>
      <Hidden smDown>
        <Link to="/new-collection" color="inherit">
          <Typography variant="body2">News </Typography>
        </Link>
        <Link to="/products" color="inherit">
          <Typography variant="body2">All Products </Typography>{" "}
        </Link>
      </Hidden>

      <Hidden smUp>
        {!searchClicked ? (
          <Box className="animate__animated animate__fadeIn">
            <Link to="/" color="inherit">
              <Typography variant="h1">PIATTELLI</Typography>
            </Link>
          </Box>
        ) : null}
      </Hidden>

      <Hidden smDown>
        <Link to="/products" color="inherit">
          <Typography variant="body2">Timless Favorites</Typography>{" "}
        </Link>
      </Hidden>
      <Box className={classes.iconWrapper}>
        {usersContext.user ? (
          <Typography>Logged in as {usersContext.user?.fullName}</Typography>
        ) : null}
        <Box onClick={() => setSearchClicked(true)} m="1rem">
          {!searchClicked ? (
            <SearchIcon />
          ) : (
            <form className="animate__animated animate__fadeIn">
              <Autocomplete
                freeSolo
                disableClearable
                options={products}
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                  <React.Fragment>
                    <span
                      onClick={() => {
                        window.location.href = `/products/${option.name}`;
                      }}
                    >
                      {option.name}
                    </span>
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.width}
                    autoFocus
                    id="search-basic"
                    label="Search"
                    margin="normal"
                    InputProps={{ ...params.InputProps, type: "search" }}
                    onBlur={() => setSearchClicked(false)}
                  />
                )}
              />
            </form>
          )}
        </Box>
        <Box m="1rem">
          <CartIcon
            onClick={() => {
              setIsCartVisible(!isCartVisible);
            }}
          />
          <Badge
            badgeContent={amountOfItemsInCart}
            color="primary"
            className="animate__animated animate__bounceIn"
            onClick={() => {
              setIsCartVisible(!isCartVisible);
            }}
          ></Badge>
          <Cart onHide={hideCart} isVisible={isCartVisible} />
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    top: 0,
    margin: "0",
    padding: "0",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "fixed",
    zIndex: 5,
    width: "100vw",
    height: "8.5rem",
    backgroundColor: "white",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  width: {
    width: "10rem",
  },
}));

export default Header;
