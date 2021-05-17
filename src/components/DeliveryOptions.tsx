import { Box, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
interface IProps {
  deliveryOption: string | undefined;
  setDeliveryOption: (value: string) => void;
}

function DeliveryOptions(props: IProps) {
  const classes = useStyles();

  //vars for delivery dates
  let today = moment();
  let today2 = today.clone();
  let today3 = today.clone();
  let pnDel = today.add(3, "d").format("dddd, MMMM Do");
  let budbeeDel = today2.add(2, "d").format("dddd, MMMM Do");
  let instaDel = today3.add(1, "d").format("dddd, MMMM Do");
  return (
    <>
      <h5 className={classes.centerFlex}>Delivery Options</h5>
      <Box className={classes.marginBottom}>
        <Box className={`${classes.centerFlex}`}>
          <Box
            onClick={() => props.setDeliveryOption("pn")}
            className={classes.deliveryBox}
          >
            Post Nord: 2-5 days
          </Box>
          <Box
            onClick={() => props.setDeliveryOption("budbee")}
            className={classes.deliveryBox}
          >
            Budbee home delivery: 1-3 days
          </Box>
          <Box
            onClick={() => props.setDeliveryOption("instabox")}
            className={classes.deliveryBox}
          >
            Instabox: 1-3 days
          </Box>
        </Box>
        <Box className={`${classes.centerFlex} ${classes.deliveryInformation}`}>
          {props.deliveryOption === "pn" ? (
            <Box>
              <Typography>Delivery cost: free</Typography>
              <Typography>Estimated delivery time: {String(pnDel)}</Typography>
            </Box>
          ) : null}
          {props.deliveryOption === "budbee" ? (
            <Box>
              <Typography>Delivery cost: 69kr</Typography>
              <Typography>
                Estimated delivery time: {String(budbeeDel)}
              </Typography>
            </Box>
          ) : null}
          {props.deliveryOption === "instabox" ? (
            <Box>
              <Typography>Delivery cost: 39kr</Typography>
              <Typography>
                Estimated delivery time: {String(instaDel)}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}

export default DeliveryOptions;

const useStyles = makeStyles((theme) => ({
  flexColumn: {
    flexDirection: "column",
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
