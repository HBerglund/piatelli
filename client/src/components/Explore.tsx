import exploreScandinave from "../assets/explore-scandinave.png";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import alternativeCursor from "../assets/alternativeCursor.png";

function Explore() {
  const classes = useStyles();
  return (
    <Box className={classes.exploreContainer}>
      <Box className={classes.imageContainer}>
        <img
          src={exploreScandinave}
          draggable="false"
          alt="A Le Scandinave promotion."
          className={`${classes.imageStyling} ${classes.customCursor}`}
        />
      </Box>
      <Box className={classes.textContainer}>
        <Typography variant="body1" className={classes.textStyling}>
          Far known to sea and shore,<br></br> Foursquare and founded well,
          <br></br> A thousand years it bore,<br></br> And then the belfry fell.
        </Typography>
        <Typography variant="body1" className={classes.textStyling}>
          The steersman of Triest<br></br> Looked where his mark should be,
          <br></br> But empty was the west<br></br> And Venice under sea.
        </Typography>
        <Button
          href={"/new-collection"}
          variant="outlined"
          className={`${classes.buttonStyling} ${classes.customCursor}`}
        >
          Explore Le Scandinave Collection
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  exploreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "53rem",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "100%",
    },
    [theme.breakpoints.only("md")]: {
      height: "100%",
    },
  },
  imageStyling: {
    width: "25rem",
    [theme.breakpoints.only("xs")]: {
      width: "60%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "20rem",
    },
    [theme.breakpoints.only("md")]: {
      width: "30rem",
    },
  },
  imageContainer: {
    height: "50rem",
    width: "100%",
    background: "#FAFAFA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "30rem",
    },
  },
  textContainer: {
    height: "50rem",
    width: "50vw",
    background: "#F2F2F2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "30rem",
    },
    [theme.breakpoints.only("md")]: {
      marginBottom: "2rem",
    },
  },
  textStyling: {
    maxWidth: "50%",
    textAlign: "center",
    marginBottom: "1rem",
    lineHeight: "2rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  buttonStyling: {
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  customCursor: {
    cursor: `url(${alternativeCursor}) 9 7, auto`,
    userSelect: "none",
  },
}));

export default Explore;
