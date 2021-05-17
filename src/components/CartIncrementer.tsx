import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CartContext, CartItem } from "./context/CartContext";
interface IProps {
  product: CartItem;
}

function GroupedButtons(props: IProps) {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        onClick={() => {
          addToCart(props.product);
        }}
      >
        +
      </Button>
      <Button>{props.product.quantity}</Button>
      <Button
        onClick={() => {
          removeFromCart(props.product);
        }}
      >
        -
      </Button>
    </ButtonGroup>
  );
}

export default GroupedButtons;
