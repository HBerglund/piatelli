import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Hidden } from "@material-ui/core";
import heroPic1 from "../assets/hero1.png";
import video1 from "../assets/film1.png";
import video2 from "../assets/film2.png";

function Collection() {
  const classes = useStyles();
  return (
    <Box className={classes.collectionContainer}>
      <Box className={classes.flexCenter}>
        <Hidden smDown>
          <Box>
            <img width={400} src={heroPic1} alt="" />
          </Box>
        </Hidden>
        <Box className={classes.textContainer}>
          <Box className={classes.titleTextContainer}>
            <Typography variant={"h3"}>New Collection</Typography>
          </Box>
          <Box className={classes.bodyTextContainer}>
            <Typography variant={"body1"} className={classes.marginBot}>
              With its warm and gentle tone, Blond Beige is one of Lemaire’
              Spring-Summer 2021 key color.
            </Typography>
            <Typography variant={"body1"} className={classes.marginBot}>
              This theme is presented on a cotton linen blend with a soft twill
              structure for the women’s, men’s, and unisex wardrobe.
            </Typography>
            <Typography variant={"body1"}>
              For carry-overs, the shade is part of our seasonal colorama with
              six soft nappa leather accessories
            </Typography>
          </Box>
        </Box>
      </Box>
      <Hidden only={["lg", "xl"]}>
        <Box className={classes.videoContainer}>
          <img width={300} height={300} src={video1} alt="" />
          <img width={300} height={300} src={video2} alt="" />
        </Box>
      </Hidden>
      <Hidden mdDown>
        <Box className={classes.videoContainer}>
          <img src={video1} alt="" />
          <img src={video2} alt="" />
        </Box>
      </Hidden>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  collectionContainer: {},
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "4rem",
    fontSize: "3rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: "1rem",
    },
  },
  videoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "5rem",
    marginTop: "1rem",
    [theme.breakpoints.down("md")]: {
      // width: "20vw",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    [theme.breakpoints.only("md")]: {
      // width: "20vw",
      flexDirection: "row",
    },
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  bodyTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  titleTextContainer: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "flex-start",
  },
  marginBot: {
    marginBottom: "2rem",
  },
}));

export default Collection;
