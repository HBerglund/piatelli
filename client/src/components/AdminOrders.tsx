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
  console.log(orderContext.allOrders);

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
