// import { Box } from "@material-ui/core";
import { Typography, Box, Hidden } from "@material-ui/core";
import alternativeCursor from "../assets/alternativeCursor.png";
import leScandinave from "../assets/le-scandinave.png";
import { makeStyles } from "@material-ui/core/styles";

function Promotion() {
  const classes = useStyles();
  return (
    <Box className={classes.promotionContainer}>
      <Box className={classes.promotionText}>
        <Typography variant="h6">Explore</Typography>
        <Hidden only={["xs", "sm"]}>
          <Typography variant="h3">LE SCANDINAVE</Typography>
        </Hidden>
        <Hidden only={["md", "lg", "xl"]}>
          <Typography variant="h4">LE SCANDINAVE</Typography>
        </Hidden>
      </Box>
      <Box>
        <img
          src={leScandinave}
          className={`${classes.customCursor} ${classes.imgStyling}`}
          draggable="false"
          alt="A Le Scandinave promotion."
        />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  promotionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  promotionText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    color: "white",
    cursor: `url(${alternativeCursor}), auto`,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  imgStyling: {
    width: "50vw",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  customCursor: {
    cursor: `url(${alternativeCursor}) 9 7, auto`,
  },
}));

export default Promotion;
