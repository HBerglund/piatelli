import { createContext, FC, useEffect, useState } from "react";
import { Order } from "../../helpers/typings";

interface OrderValue {
  allOrders: Order[];
  currentOrder: Order | undefined;
  getAllOrders: () => void;
  saveOrderToDB: (order: Order) => void;
}

export const OrderContext = createContext<OrderValue>({
  allOrders: [],
  currentOrder: undefined,
  getAllOrders: () => [],
  saveOrderToDB: () => {},
});

const OrderProvider: FC<{}> = ({ children }) => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>();

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

  const saveOrderToDB = (data: Order) => {
    fetch("/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errorCode) {
          console.log({ result });
          setCurrentOrder(undefined);
        } else {
          setCurrentOrder(result);
        }
      });
  };

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        currentOrder,
        getAllOrders,
        saveOrderToDB,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
