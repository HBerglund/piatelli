import { createContext, FC, useContext, useEffect, useState } from "react";
import { Address, Delivery, Order, User } from "../../helpers/typings";
import { CartContext } from "./CartContext";
import { ProductsContext } from "./ProductsContext";
import { UsersContext } from "./UsersContext";

interface OrderValue {
  allOrders: Order[];
  latestOrderId: string | undefined;
  addressDetails: Address | undefined;
  getAllOrders: () => void;
  saveOrderToDB: () => void;
  saveAddressDetails: (addressDeets: Address) => void;
  saveDeliveryDetails: (deliveryDeets: Delivery) => void;
  savePaymentDetails: (paymentDeets: string) => void;
  saveTotalSum: (sumDeets: number) => void;
}

export const OrderContext = createContext<OrderValue>({
  allOrders: [],
  latestOrderId: undefined,
  addressDetails: undefined,
  getAllOrders: () => [],
  saveOrderToDB: () => {},
  saveAddressDetails: () => {},
  saveDeliveryDetails: () => {},
  savePaymentDetails: () => {},
  saveTotalSum: () => {},
});

const OrderProvider: FC<{}> = ({ children }) => {
  const usersContext = useContext(UsersContext);
  const cartContext = useContext(CartContext);
  const productContext = useContext(ProductsContext);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [latestOrderId, setLatestOrderId] = useState<string>();
  const [addressDetails, setAddressDetails] = useState<Address | undefined>();
  const [paymentDetails, setPaymentDetails] = useState<string>();
  const [deliveryDetails, setDeliveryDetails] = useState<Delivery>();
  const [totalSum, setTotalSum] = useState<number>();

  const saveAddressDetails = (addressDeets: Address) => {
    setAddressDetails(addressDeets);
  };
  const saveDeliveryDetails = (deliveryDeets: Delivery) => {
    setDeliveryDetails(deliveryDeets);
  };

  const savePaymentDetails = (paymentDeets: string) => {
    setPaymentDetails(paymentDeets);
  };

  const saveTotalSum = (sumDeets: number) => {
    if (deliveryDetails) {
      console.log("sumdeets: " + sumDeets);
      console.log("deliveryPrice: " + deliveryDetails?.price);
      const totalPrice = deliveryDetails?.price + sumDeets;
      setTotalSum(totalPrice);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    fetch("/orders", {
      method: "GET",
      credentials: "include",
    }).then((res) =>
      res.json().then((result) => {
        if (result.errorCode) {
          setAllOrders([]);
        } else {
          setAllOrders(result);
        }
      })
    );
  };

  const saveOrderToDB = () => {
    const orderToSave: Order = {
      customer: usersContext.user ? usersContext.user : ({} as User),
      address: addressDetails ? addressDetails : ({} as Address),
      items: cartContext.cart,
      payment: paymentDetails ? paymentDetails : "",
      delivery: deliveryDetails ? deliveryDetails : ({} as Delivery),
      sum: totalSum ? totalSum : 0,
    };
    fetch("/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderToSave),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errorCode) {
          console.log({ result });
        } else {
          setLatestOrderId(result._id);
          for (const product of result.items) {
            updateStock(product._id, product.quantity);
          }
        }
      });
  };

  const updateStock = (productID: string, quantity: number) => {
    fetch(`/products/stock/${productID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errorCode) {
          console.log({ result });
        } else {
          console.log(result);
          productContext.getAllProducts();
        }
      });
  };

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        latestOrderId,
        addressDetails,
        getAllOrders,
        saveOrderToDB,
        saveAddressDetails,
        saveDeliveryDetails,
        savePaymentDetails,
        saveTotalSum,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
