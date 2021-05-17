//node components
import { Box, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//images
import alternativeCursorBlack from "../assets/alternativeCursorBlack.png";
import alternativeCursor from "../assets/alternativeCursor.png";
//components
import Hero from "../components/Hero";
import Promotion from "../components/Promotion";
import Explore from "../components/Explore";
import PromotionSecond from "../components/PromotionSecond";
import ProductGrid from "../components/ProductGrid";
import Newsletter from "../components/Newsletter";

function Home() {
  const classes = useStyles();

  return (
    <Box className={classes.customCursorBlack}>
      <Box className={classes.landingContainer}>
        <Hero />
        <Promotion />
        <Explore />
        <PromotionSecond />
        <Box className={classes.cataloguePreviewContainer}>
          <ProductGrid isLarge={false} />
        </Box>
      </Box>
      <Hidden smDown>
        <Newsletter />
      </Hidden>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  catalogueStyles: {
    marginTop: "8.5rem",
  },
  landingContainer: {
    width: "50vw",
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "90vw",
    },
    [theme.breakpoints.only("lg")]: {
      width: "65vw",
    },
    [theme.breakpoints.only("xl")]: {
      width: "50vw",
    },
    [theme.breakpoints.only("md")]: {
      width: "70vw",
    },
    [theme.breakpoints.only("sm")]: {
      width: "70vw",
    },
  },
  customCursorBlack: {
    cursor: `url(${alternativeCursorBlack}) 9 7, auto`,
  },
  customCursor: {
    cursor: `url(${alternativeCursor}) 9 7, auto`,
  },
  cataloguePreviewContainer: {
    marginTop: "1rem",
  },
}));

export default Home;
