import {
  Box,
  createStyles,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Order } from "../helpers/typings";

interface Props {
  order: Order;
}

function AdminOrderItem(props: Props) {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        width: "100%",
      },
      accRoot: { margin: "1rem 0" },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "12%",
        flexShrink: 0,
        whiteSpace: "nowrap",
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      saveButton: {
        whiteSpace: "nowrap",
      },
      row: {
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem 0",
        width: "100%",

        borderBottom: "1px solid #f3f3f3",
      },
      editBox: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      },
      details: {
        display: "flex",
        flexDirection: "column",
      },
    })
  );

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { _id, customer, items, payment, sum, delivery, address } = props.order;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.accRoot}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            style={{ marginRight: "1rem", fontWeight: "bold" }}
            variant="body2"
            className={classes.heading}
          >
            {_id}
          </Typography>
          <Hidden xsDown>
            <Typography className={classes.secondaryHeading}>
              Amount: {sum} $
            </Typography>
          </Hidden>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Box className={classes.row}>
            <Typography style={{ marginBottom: "4px" }} variant="caption">
              Customer
            </Typography>
            <Typography>{customer}</Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginBottom: "4px" }} variant="caption">
              Address
            </Typography>
            <Typography>{address.street}</Typography>
            <Typography>{address.zipcode}</Typography>
            <Typography>{address.city}</Typography>
            <Typography>{address.country}</Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginBottom: "4px" }} variant="caption">
              Items
            </Typography>

            {items.forEach((item) => (
              <Typography>{item}</Typography>
            ))}
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginBottom: "4px" }} variant="caption">
              Payment
            </Typography>
            <Typography>{payment}</Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginBottom: "4px" }} variant="caption">
              Delivery
            </Typography>
            <Typography>{delivery.name}</Typography>
            <Typography>$ {delivery.price}</Typography>
            <Typography>Delivery within {delivery.deliveryTime}</Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginBottom: "4px" }} variant="caption">
              Order Sum
            </Typography>
            <Typography>$ {sum}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AdminOrderItem;
