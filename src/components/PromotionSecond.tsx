// import { Box } from "@material-ui/core";
import alternativeCursor from "../assets/alternativeCursor.png";
import dress from "../assets/dress-cu.png";
import { Typography, Box, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function PromotionSecond() {
  const classes = useStyles();
  return (
    <Box className={classes.promotionContainer}>
      <Hidden only={["xs", "sm"]}>
        <Box className={classes.promotionText}>
          <Typography variant="h6">who is</Typography>
          <Typography variant="h3">MONA-LISA</Typography>
          <Box className={classes.lineBreak}>
            <Typography variant="body2">by</Typography>
            <Typography variant="h3">PIATTELLI</Typography>
          </Box>
        </Box>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Box className={classes.promotionText}>
          <Typography variant="h6">who is</Typography>
          <Typography variant="h4">MONA-LISA</Typography>
          <Box className={classes.lineBreak}>
            <Typography variant="body2">by</Typography>
            <Typography variant="h4">PIATTELLI</Typography>
          </Box>
        </Box>
      </Hidden>
      <Box>
        <img
          src={dress}
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
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  imgStyling: {
    width: "50vw",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  promotionText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    color: "white",
    cursor: `url(${alternativeCursor}), auto`,
    letterSpacing: "0.07rem",
  },
  customCursor: {
    cursor: `url(${alternativeCursor}) 9 7, auto`,
  },
  lineBreak: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export default PromotionSecond;
