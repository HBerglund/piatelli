import { Box, Container, Typography, Link, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FooterSection from "./FooterSection";

function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.containerStyle} maxWidth={false}>
      <Hidden only={"xs"}>
        <Box className={classes.rootStyle}>
          <FooterSection />
          <FooterSection />
          <Hidden smDown>
            <FooterSection />
            <FooterSection />
          </Hidden>
        </Box>
      </Hidden>
      <Link href="/login">
        <Typography>Log in</Typography>
      </Link>
      <Box>
        <Box className={classes.footerLogo}>
          <Typography variant="h4">PIATTELLI</Typography>
        </Box>
      </Box>
      <Hidden smUp>
        <Box className={classes.mobileFooterContainer}>
          <Box className={classes.mobileFooterContent}>
            <Box>
              <Typography variant="subtitle2">
                <Link>Collections</Link>
              </Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="subtitle2">
                <Link>Help</Link>
              </Typography>
            </Box>
          </Box>
          <Box className={classes.mobileFooterContent}>
            <Box>
              <Typography variant="subtitle2">
                <Link>Company</Link>
              </Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="subtitle2">
                <Link>Follow Us</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Container>
  );
}
const useStyles = makeStyles((theme) => ({
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#333333",
    width: "100%",
  },
  rootStyle: {
    width: "60%",
    display: "flex",
    justifyContent: "space-around",
    padding: "5rem",
  },
  footerLogo: {
    paddingBottom: "2rem",
    color: "#E5E5E5",
  },
  mobileFooterContainer: {
    width: "100%",
    height: "10rem",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  mobileFooterContent: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
}));

export default Footer;
