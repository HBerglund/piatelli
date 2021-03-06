import { useEffect, useState } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import { Delivery } from "../helpers/typings";

interface IProps {
  deliveryOption: Delivery | undefined;
  setDeliveryOption: (value: any) => void;
  setError: (err: boolean) => void;
  detailsAreMissing: () => boolean;
}

function DeliveryOptions(props: IProps) {
  const classes = useStyles();

  const [deliveryOptions, setDeliveryOptions] = useState<Delivery[]>([]);
  const [chosenDeliveryOption, setChosenDeliveryOption] =
    useState<Delivery | undefined>(undefined);

  //vars for delivery dates
  let today = moment();
  let today2 = today.clone();
  let today3 = today.clone();
  let pnDel = today.add(3, "d").format("dddd, MMMM Do");
  let budbeeDel = today2.add(2, "d").format("dddd, MMMM Do");
  let instaDel = today3.add(1, "d").format("dddd, MMMM Do");

  console.log("delivery render");

  useEffect(() => {
    fetch("/delivery")
      .then((res) => res.json())
      .then((result) => {
        if (result.errorCode) {
          console.log({ result });
        } else {
          setDeliveryOptions(result);
        }
      });
  }, []);

  const handleDeliveryClick = (deliveryOption: Delivery) => {
    if (!props.detailsAreMissing) {
      props.setError(true);
    } else {
      props.setError(false);
    }
    props.setDeliveryOption(deliveryOption);
    setChosenDeliveryOption(deliveryOption);
  };

  return (
    <Box className={classes.root}>
      <Typography component="h5" className={classes.centerFlex}>
        Delivery Options
      </Typography>
      <Box className={classes.marginBottom}>
        <Box className={`${classes.centerFlex}`}>
          {deliveryOptions.map((option) => (
            <Box className={classes.flexColumn} key={option._id}>
              <Button
                onClick={() => handleDeliveryClick(option)}
                className={classes.deliveryBox}
              >
                {option.name}
              </Button>
            </Box>
          ))}
        </Box>
        {chosenDeliveryOption ? (
          <Box
            className={`${classes.centerFlex} ${classes.deliveryInformation}`}
          >
            <Box>
              <Typography>
                Delivery cost: {chosenDeliveryOption.price} kr
              </Typography>
              {chosenDeliveryOption.name === "Post Nord" ? (
                <Typography>
                  Estimated delivery time: {String(pnDel)}
                </Typography>
              ) : null}
              {chosenDeliveryOption.name === "Budbee home delivery" ? (
                <Typography>
                  Estimated delivery time: {String(budbeeDel)}
                </Typography>
              ) : null}
              {chosenDeliveryOption.name === "Instabox" ? (
                <Typography>
                  Estimated delivery time: {String(instaDel)}
                </Typography>
              ) : null}
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default DeliveryOptions;

const useStyles = makeStyles((theme) => ({
  root: { margin: "4rem 0" },
  flexColumn: {
    flexDirection: "column",
    display: "flex",
  },
  flexRow: {
    flexDirection: "row",
    display: "flex",
  },
  centerFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  deliveryBox: {
    margin: "1rem",
    padding: "0.5rem",
    border: "1px solid black",
    borderRadius: 5,
    cursor: "pointer",
  },
  deliveryInformation: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  marginBottom: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2rem",
    },
  },
}));
