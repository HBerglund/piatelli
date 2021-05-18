import { Typography, Box, Hidden, Link } from "@material-ui/core";
import { CSSProperties } from "react";
import { useState } from "react";
import heroPic1 from "../assets/hero1.png";
import heroPic2 from "../assets/hero2.png";
import alternativeCursor from "../assets/alternativeCursor.png";
import { useMouse } from "./MousePos";
import Carousel from "./Carousel";
import { makeStyles } from "@material-ui/core/styles";

function Hero() {
  const [leftIsShown, setLeftIsShown] = useState(false);
  const [rightIsShown, setRightIsShown] = useState(false);
  const { x, y } = useMouse();
  const classes = useStyles();

  const heroTitleLeft: CSSProperties = {
    color: "white",
    position: "absolute",
    left: x,
    top: y,
    marginLeft: "-8rem",
    marginTop: "-3rem",
    whiteSpace: "nowrap",
    fontFamily: "roboto",
  };

  const heroTitleRight: CSSProperties = {
    color: "white",
    position: "absolute",
    left: x,
    top: y,
    marginLeft: "-5rem",
    marginTop: "-3rem",
    whiteSpace: "nowrap",
    fontFamily: "roboto",
  };

  return (
    <>
      <Box className={classes.heroContainer}>
        <Box
          className={classes.heroPicLeft}
          onMouseEnter={() => setLeftIsShown(true)}
          onMouseLeave={() => setLeftIsShown(false)}
        >
          <Hidden mdDown>
            {leftIsShown && <h2 style={heroTitleLeft}>OUR BAGS</h2>}
          </Hidden>
        </Box>
        <Hidden lgUp>
          <Box className={classes.mobileHeroTitle}>
            <Link variant={"body2"} href={"/catalogue"} color={"inherit"}>
              Our Bags
            </Link>
          </Box>
        </Hidden>
        <Box
          className={classes.heroPicRight}
          onMouseEnter={() => setRightIsShown(true)}
          onMouseLeave={() => setRightIsShown(false)}
        >
          <Hidden smDown>
            {rightIsShown && <h2 style={heroTitleRight}>THE SOFTY</h2>}
          </Hidden>
        </Box>
        <Hidden lgUp>
          <Box className={classes.mobileHeroTitle}>
            <Link variant={"body2"} href={"/catalogue"} color={"inherit"}>
              The Softy
            </Link>
          </Box>
        </Hidden>
      </Box>
      <Box>
        <Hidden smDown>
          <Typography
            variant="h6"
            className={classes.flexCenter && classes.carouselText}
          >
            More than 135 years of timeless Italian craftmanship.
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography
            variant="body2"
            className={classes.flexCenter && classes.carouselText}
          >
            More than 135 years of timeless Italian craftmanship.
          </Typography>
        </Hidden>
      </Box>
      <Box>
        <Hidden lgDown>
          <Carousel />
        </Hidden>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  heroPicLeft: {
    backgroundImage: `url(${heroPic1})`,
    width: "40rem",
    height: "55rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "fill",
    marginRight: ".5rem",
    cursor: `url(${alternativeCursor}) 9 7, auto`,
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
      height: "20rem",
      marginLeft: "0",
      marginBottom: "3rem",
      backgroundSize: "cover",
      backgroundPosition: "top",
    },
  },
  heroPicRight: {
    backgroundImage: `url(${heroPic2})`,
    width: "40rem",
    height: "55rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    marginLeft: ".5rem",
    cursor: `url(${alternativeCursor}) 9 7, auto`,
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
      height: "20rem",
      marginLeft: "0",
      marginTop: "2rem",
      marginBottom: "3rem",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
    },
  },
  heroContainer: {
    marginTop: "8.5rem",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  carouselText: {
    marginBottom: "2rem",
    marginTop: "2rem",
    textAlign: "center",
  },
  mobileHeroTitle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",

    height: "100%",
    borderBottom: "2px solid black",
  },
}));

export default Hero;
