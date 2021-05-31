import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Order } from "../helpers/typings";
import AdminOrderItem from "./AdminOrderItem";
import { OrderContext } from "./context/OrderContext";

function AdminOrders() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {},
    })
  );

  const orderContext = useContext(OrderContext);

  const orders: any = [
    {
      customer: "dfg87dfg87dgh78f87hg9sgdf9dgh",
      address: {
        street: "Jenny Lindsgatan 4B",
        zipcode: "41662",
        city: "Gothenburg",
        country: "Sweden",
      },
      items: ["234254243fdggdfg", "df7gd78fg87dfg", "dfg97fgh9fg89h8fg9h"],
      payment: "Klarna",
      delivery: {
        name: "Schenker",
        price: 5,
        deliveryTime: "3 days",
      },
      sum: 4765,
    },
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        All Orders
      </Typography>
      <Box>
        {orderContext.allOrders.map((order: Order, i: number) => (
          <AdminOrderItem order={order} key={i} />
        ))}
      </Box>
    </div>
  );
}

export default AdminOrders;
